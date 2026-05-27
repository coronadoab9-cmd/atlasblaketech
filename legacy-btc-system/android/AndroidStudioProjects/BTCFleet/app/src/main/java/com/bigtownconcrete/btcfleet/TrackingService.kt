package com.bigtownconcrete.btcfleet

import android.Manifest
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.os.IBinder
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationCallback
import com.google.android.gms.location.LocationRequest
import com.google.android.gms.location.LocationResult
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.Priority
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject

class TrackingService : Service() {

    companion object {
        const val BASE_URL = "https://btc-fleet-backend.onrender.com"
        private const val CHANNEL_ID = "btc_fleet_tracking_channel"
        private const val CHANNEL_NAME = "BTC Fleet Tracking"
        private const val NOTIFICATION_ID = 1001

        private const val PREFS_NAME = "btc_fleet_prefs"
        private const val PREF_DRIVER_ID = "driver_id"
        private const val PREF_TRUCK_NUMBER = "truck_number"
        private const val PREF_DEVICE_UUID = "device_uuid"
    }

    private lateinit var fusedLocationClient: FusedLocationProviderClient
    private lateinit var locationCallback: LocationCallback
    private lateinit var locationRequest: LocationRequest

    private val client = OkHttpClient()

    override fun onCreate() {
        super.onCreate()

        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this)

        createNotificationChannel()
        startForeground(NOTIFICATION_ID, buildNotification("Tracking GPS..."))

        locationRequest = LocationRequest.Builder(
            Priority.PRIORITY_HIGH_ACCURACY,
            10000L
        )
            .setMinUpdateIntervalMillis(5000L)
            .setWaitForAccurateLocation(false)
            .build()

        locationCallback = object : LocationCallback() {
            override fun onLocationResult(result: LocationResult) {
                val location = result.lastLocation ?: return
                val speedMph = location.speed * 2.23694
                sendLocationToBackend(location.latitude, location.longitude, speedMph)
            }
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        startLocationUpdates()
        return START_STICKY
    }

    override fun onDestroy() {
        super.onDestroy()
        try {
            fusedLocationClient.removeLocationUpdates(locationCallback)
        } catch (_: Exception) {
        }
    }

    override fun onBind(intent: Intent?): IBinder? = null

    private fun startLocationUpdates() {
        val fineGranted = ActivityCompat.checkSelfPermission(
            this,
            Manifest.permission.ACCESS_FINE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED

        val coarseGranted = ActivityCompat.checkSelfPermission(
            this,
            Manifest.permission.ACCESS_COARSE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED

        if (!fineGranted && !coarseGranted) {
            stopSelf()
            return
        }

        try {
            fusedLocationClient.requestLocationUpdates(
                locationRequest,
                locationCallback,
                mainLooper
            )
        } catch (_: SecurityException) {
            stopSelf()
        }
    }

    private fun sendLocationToBackend(latitude: Double, longitude: Double, speedMph: Double) {
        val prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

        val truckNumber = prefs.getString(PREF_TRUCK_NUMBER, "") ?: ""
        val status = prefs.getString("status", "Idle") ?: "Idle"
        val jobNumber = prefs.getString("job_number", "") ?: ""
        val deviceUuid = prefs.getString(PREF_DEVICE_UUID, "") ?: ""
        val driverId = if (prefs.contains(PREF_DRIVER_ID)) prefs.getInt(PREF_DRIVER_ID, 0) else 0

        if (truckNumber.isBlank()) {
            val notification = buildNotification("No truck assigned")
            val notificationManager =
                getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.notify(NOTIFICATION_ID, notification)
            return
        }

        val json = JSONObject().apply {
            put("truck_number", truckNumber)
            put("latitude", latitude)
            put("longitude", longitude)
            put("status", status)
            put("job_number", jobNumber)
            put("device_uuid", deviceUuid)
            put("speed_mph", speedMph)
            if (driverId > 0) put("driver_id", driverId)
        }

        val body = json.toString()
            .toRequestBody("application/json; charset=utf-8".toMediaType())

        val request = Request.Builder()
            .url("$BASE_URL/gps")
            .post(body)
            .build()

        Thread {
            try {
                client.newCall(request).execute().use { response ->
                    val updatedText = if (response.isSuccessful) {
                        "Truck $truckNumber • $status"
                    } else {
                        "Tracking error • ${response.code}"
                    }

                    val notification = buildNotification(updatedText)
                    val notificationManager =
                        getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
                    notificationManager.notify(NOTIFICATION_ID, notification)
                }
            } catch (_: Exception) {
                val notification = buildNotification("Tracking offline")
                val notificationManager =
                    getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
                notificationManager.notify(NOTIFICATION_ID, notification)
            }
        }.start()
    }

    private fun buildNotification(contentText: String): Notification {
        return NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("BTC Fleet Tracking")
            .setContentText(contentText)
            .setSmallIcon(android.R.drawable.ic_menu_mylocation)
            .setOngoing(true)
            .setOnlyAlertOnce(true)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .build()
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                CHANNEL_NAME,
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = "Foreground service for BTC Fleet GPS tracking"
            }

            val manager = getSystemService(NotificationManager::class.java)
            manager.createNotificationChannel(channel)
        }
    }
}