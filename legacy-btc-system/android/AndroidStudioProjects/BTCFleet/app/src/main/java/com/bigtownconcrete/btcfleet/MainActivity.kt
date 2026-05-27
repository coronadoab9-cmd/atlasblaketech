package com.bigtownconcrete.btcfleet

import android.Manifest
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.provider.Settings
import android.widget.Toast
import android.view.WindowManager
import androidx.activity.ComponentActivity
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Directions
import androidx.compose.material.icons.filled.LocalShipping
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.OpenInNew
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.StopCircle
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.core.content.ContextCompat
import androidx.core.content.edit
import com.bigtownconcrete.btcfleet.ui.theme.BTCFleetTheme
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject
import java.io.IOException

private const val API_BASE = "https://btc-fleet-backend.onrender.com"
private const val PREFS_NAME = "btc_fleet_prefs"
private const val PREF_DRIVER_ID = "driver_id"
private const val PREF_DRIVER_NAME = "driver_name"
private const val PREF_TRUCK_NUMBER = "truck_number"
private const val PREF_SIGNED_IN_AT = "signed_in_at"
private const val PREF_DEVICE_UUID = "device_uuid"

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Keep screen awake while app is open
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)

        // Set brightness to 80%
        val layoutParams = window.attributes
        layoutParams.screenBrightness = 0.8f
        window.attributes = layoutParams


        ensureDeviceUuid()

        setContent {
            BTCFleetTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = Color(0xFF081A2E)
                ) {
                    TabletHome()
                }
            }
        }
    }

    private fun ensureDeviceUuid() {
        val prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        if (prefs.getString(PREF_DEVICE_UUID, null).isNullOrBlank()) {
            val newId = Settings.Secure.getString(contentResolver, Settings.Secure.ANDROID_ID)
                ?: "tablet-${System.currentTimeMillis()}"
            prefs.edit { putString(PREF_DEVICE_UUID, newId) }
        }
    }
}

private fun startGpsTracking(context: Context) {
    val serviceIntent = Intent(context, TrackingService::class.java)
    ContextCompat.startForegroundService(context, serviceIntent)
}

data class DriverSession(
    val driverId: Int,
    val driverName: String,
    val truckNumber: String,
    val signedInAt: String
)

data class CurrentJob(
    val jobNumber: String,
    val address: String,
    val orderedQty: Double,
    val deliveredQty: Double
)

data class ActiveETicket(
    val id: Int,
    val token: String,
    val status: String,
    val ticketNumber: String,
    val customerName: String,
    val truckNumber: String,
    val assignedToName: String,
    val isReassigned: Boolean,
    val url: String
)

private object FleetApi {
    private val client = OkHttpClient()
    private val jsonType = "application/json; charset=utf-8".toMediaType()

    fun loginDriver(
        pin: String,
        deviceUuid: String,
        deviceName: String
    ): DriverSession {
        val payload = JSONObject().apply {
            put("pin", pin)
            put("device_uuid", deviceUuid)
            put("device_name", deviceName)
        }

        val request = Request.Builder()
            .url("$API_BASE/drivers/login")
            .post(payload.toString().toRequestBody(jsonType))
            .build()

        client.newCall(request).execute().use { response ->
            val body = response.body?.string().orEmpty()
            if (!response.isSuccessful) {
                throw IOException(extractError(body, "Login failed"))
            }

            val json = JSONObject(body)
            return DriverSession(
                driverId = json.optInt("driver_id"),
                driverName = json.optString("driver_name"),
                truckNumber = json.optString("truck_number"),
                signedInAt = json.optString("signed_in_at")
            )
        }
    }

    fun logoutDriver(deviceUuid: String) {
        val payload = JSONObject().apply {
            put("device_uuid", deviceUuid)
        }

        val request = Request.Builder()
            .url("$API_BASE/drivers/logout")
            .post(payload.toString().toRequestBody(jsonType))
            .build()

        client.newCall(request).execute().use { response ->
            val body = response.body?.string().orEmpty()
            if (!response.isSuccessful) {
                throw IOException(extractError(body, "Logout failed"))
            }
        }
    }

    fun getCurrentJob(truckNumber: String): CurrentJob {
        val request = Request.Builder()
            .url("$API_BASE/jobs/current/$truckNumber")
            .get()
            .build()

        client.newCall(request).execute().use { response ->
            val body = response.body?.string().orEmpty()
            if (!response.isSuccessful) {
                throw IOException(extractError(body, "Could not load current job"))
            }

            val json = JSONObject(body)
            return CurrentJob(
                jobNumber = json.optString("job_number"),
                address = json.optString("address"),
                orderedQty = json.optDouble("ordered_qty", 0.0),
                deliveredQty = json.optDouble("delivered_qty", 0.0)
            )
        }
    }

    fun updateDeliveredQty(truckNumber: String, deliveredQty: Double) {
        val payload = JSONObject().apply {
            put("delivered_qty", deliveredQty)
        }

        val request = Request.Builder()
            .url("$API_BASE/jobs/delivered/$truckNumber")
            .post(payload.toString().toRequestBody(jsonType))
            .build()

        client.newCall(request).execute().use { response ->
            val body = response.body?.string().orEmpty()
            if (!response.isSuccessful) {
                throw IOException(extractError(body, "Could not update delivered quantity"))
            }
        }
    }

    fun completeJob(truckNumber: String) {
        val request = Request.Builder()
            .url("$API_BASE/jobs/complete/$truckNumber")
            .post("{}".toRequestBody(jsonType))
            .build()

        client.newCall(request).execute().use { response ->
            val body = response.body?.string().orEmpty()
            if (!response.isSuccessful) {
                throw IOException(extractError(body, "Could not complete job"))
            }
        }
    }

    fun sendTruckEvent(truckNumber: String, eventType: String, details: String = "") {
        val payload = JSONObject().apply {
            put("details", details)
        }

        val request = Request.Builder()
            .url("$API_BASE/trucks/event/$truckNumber/$eventType")
            .post(payload.toString().toRequestBody(jsonType))
            .build()

        client.newCall(request).execute().use { response ->
            val body = response.body?.string().orEmpty()
            if (!response.isSuccessful) {
                throw IOException(extractError(body, "Could not update truck status"))
            }
        }
    }

    fun getActiveETickets(truckNumber: String): List<ActiveETicket> {
        val request = Request.Builder()
            .url("$API_BASE/api/etickets/active-list/$truckNumber")
            .get()
            .build()

        client.newCall(request).execute().use { response ->
            val body = response.body?.string().orEmpty()

            if (!response.isSuccessful) {
                throw IOException(
                    extractError(body, "Could not load active eTickets")
                )
            }

            val jsonArray = org.json.JSONArray(body)
            val results = mutableListOf<ActiveETicket>()

            for (i in 0 until jsonArray.length()) {
                val json = jsonArray.getJSONObject(i)

                results.add(
                    ActiveETicket(
                        id = json.optInt("id"),
                        token = json.optString("token"),
                        status = json.optString("status"),
                        ticketNumber = json.optString("ticket_number"),
                        customerName = json.optString("customer_name"),
                        truckNumber = json.optString("truck_number"),
                        assignedToName = json.optString("assigned_to_name"),
                        isReassigned = json.optBoolean("is_reassigned", false),
                        url = json.optString("url")
                    )
                )
            }

            return results
        }
    }

    private fun extractError(body: String, fallback: String): String {
        return try {
            JSONObject(body).optString("detail").ifBlank { fallback }
        } catch (_: Exception) {
            fallback
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun TabletHome() {
    val context = LocalContext.current
    val prefs = remember {
        context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
    }
    val scope = rememberCoroutineScope()

    val locationPermissionLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->
        val fineGranted = permissions[Manifest.permission.ACCESS_FINE_LOCATION] == true
        val coarseGranted = permissions[Manifest.permission.ACCESS_COARSE_LOCATION] == true

        if (fineGranted || coarseGranted) {
            startGpsTracking(context)
            Toast.makeText(
                context,
                "Location permission granted",
                Toast.LENGTH_SHORT
            ).show()
        } else {
            Toast.makeText(
                context,
                "Location permission is required for GPS tracking",
                Toast.LENGTH_LONG
            ).show()
        }
    }

    var loading by remember { mutableStateOf(true) }
    var busy by remember { mutableStateOf(false) }
    var error by remember { mutableStateOf("") }

    var session by remember { mutableStateOf(loadSavedSession(prefs)) }
    var pin by remember { mutableStateOf("") }
    var deliveredQtyInput by remember { mutableStateOf("") }

    var currentJob by remember {
        mutableStateOf(CurrentJob("", "", 0.0, 0.0))
    }

    var activeETickets by remember {
        mutableStateOf<List<ActiveETicket>>(emptyList())
    }

    suspend fun refreshData() {
        val currentSession = session ?: return

        val job = withContext(Dispatchers.IO) {
            FleetApi.getCurrentJob(currentSession.truckNumber)
        }

        val etickets = withContext(Dispatchers.IO) {
            FleetApi.getActiveETickets(currentSession.truckNumber)
        }

        currentJob = job
        activeETickets = etickets
    }

    LaunchedEffect(Unit) {
        loading = true
        error = ""
        try {
            if (session != null) {
                refreshData()
            }
        } catch (e: Exception) {
            error = e.message ?: e.javaClass.simpleName ?: "Could not load tablet data"
        } finally {
            loading = false
        }
    }

    LaunchedEffect(session) {
        while (session != null) {
            try {
                refreshData()
            } catch (_: Exception) {
                // Keep app running even if refresh fails once
            }

            kotlinx.coroutines.delay(15000)
        }
    }

    val fullDeviceUuid = prefs.getString(PREF_DEVICE_UUID, "") ?: ""

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF081A2E))
    ) {
        TopAppBar(
            title = {
                Text(
                    text = "BTC Tablet",
                    color = Color.White,
                    fontWeight = FontWeight.Bold
                )
            },
            actions = {
                if (fullDeviceUuid.isNotBlank()) {
                    Text(
                        text = fullDeviceUuid,
                        color = Color.White,
                        fontWeight = FontWeight.Bold,
                        maxLines = 1,
                        modifier = Modifier.padding(end = 16.dp)
                    )
                }
            },
            colors = TopAppBarDefaults.topAppBarColors(
                containerColor = Color(0xFF102742)
            )
        )

        if (loading) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                CircularProgressIndicator(color = Color(0xFFF97316))
            }
            return@Column
        }

        if (session == null) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp),
                contentAlignment = Alignment.Center
            ) {
                Column(
                    modifier = Modifier.fillMaxWidth(),
                    verticalArrangement = Arrangement.Center
                ) {
                    if (error.isNotBlank()) {
                        ErrorCard(error)
                        Spacer(modifier = Modifier.height(12.dp))
                    }

                    DriverLoginCard(
                        pin = pin,
                        onPinChange = { pin = it.filter { ch -> ch.isDigit() }.take(6) },
                        busy = busy,
                        onLogin = {
                            scope.launch {
                                busy = true
                                error = ""
                                try {
                                    val deviceUuid = prefs.getString(PREF_DEVICE_UUID, "") ?: ""
                                    val deviceName = android.os.Build.MODEL ?: "BTC Tablet"

                                    val loggedIn = withContext(Dispatchers.IO) {
                                        FleetApi.loginDriver(
                                            pin = pin,
                                            deviceUuid = deviceUuid,
                                            deviceName = deviceName
                                        )
                                    }

                                    session = loggedIn
                                    saveSession(prefs, loggedIn)
                                    pin = ""

                                    val fineGranted = ContextCompat.checkSelfPermission(
                                        context,
                                        Manifest.permission.ACCESS_FINE_LOCATION
                                    ) == PackageManager.PERMISSION_GRANTED

                                    val coarseGranted = ContextCompat.checkSelfPermission(
                                        context,
                                        Manifest.permission.ACCESS_COARSE_LOCATION
                                    ) == PackageManager.PERMISSION_GRANTED

                                    if (fineGranted || coarseGranted) {
                                        startGpsTracking(context)
                                    } else {
                                        locationPermissionLauncher.launch(
                                            arrayOf(
                                                Manifest.permission.ACCESS_FINE_LOCATION,
                                                Manifest.permission.ACCESS_COARSE_LOCATION
                                            )
                                        )
                                    }

                                    refreshData()

                                    Toast.makeText(
                                        context,
                                        "Logged in as ${loggedIn.driverName}",
                                        Toast.LENGTH_SHORT
                                    ).show()
                                } catch (e: Exception) {
                                    error = e.message ?: e.javaClass.simpleName ?: "Login failed"
                                } finally {
                                    busy = false
                                }
                            }
                        }
                    )
                }
            }
        } else {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .verticalScroll(rememberScrollState())
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                if (error.isNotBlank()) {
                    ErrorCard(error)
                }

                SessionHeaderCard(
                    session = session!!,
                    onLogout = {
                        scope.launch {
                            busy = true
                            error = ""
                            try {
                                val deviceUuid = prefs.getString(PREF_DEVICE_UUID, "") ?: ""
                                withContext(Dispatchers.IO) {
                                    FleetApi.logoutDriver(deviceUuid)
                                }
                            } catch (_: Exception) {
                            } finally {
                                context.stopService(Intent(context, TrackingService::class.java))
                                clearSession(prefs)
                                session = null
                                currentJob = CurrentJob("", "", 0.0, 0.0)
                                activeETickets = emptyList()
                                busy = false
                            }
                        }
                    }
                )

                if (activeETickets.isNotEmpty()) {
                    ActiveETicketsCard(
                        etickets = activeETickets,
                        onOpen = { selectedTicket ->
                            if (selectedTicket.url.isBlank()) {
                                Toast.makeText(
                                    context,
                                    "eTicket link is missing",
                                    Toast.LENGTH_SHORT
                                ).show()
                                return@ActiveETicketsCard
                            }

                            val intent = Intent(context, ETicketWebViewActivity::class.java).apply {
                                putExtra("eticket_url", selectedTicket.url)
                            }
                            context.startActivity(intent)
                        }
                    )
                } else {
                    SectionCard {
                        Text(
                            text = "No Active eTickets",
                            color = Color.White,
                            fontWeight = FontWeight.Bold,
                            style = MaterialTheme.typography.headlineSmall
                        )

                        Spacer(modifier = Modifier.height(8.dp))

                        Text(
                            text = "This tablet will automatically refresh and show pending or reassigned eTickets for Truck ${session!!.truckNumber}.",
                            color = Color(0xFFD7E6F5)
                        )
                    }
                }

                if (busy) {
                    Box(
                        modifier = Modifier.fillMaxWidth(),
                        contentAlignment = Alignment.Center
                    ) {
                        CircularProgressIndicator(color = Color(0xFFF97316))
                    }
                }
/*
                SessionHeaderCard(
                    session = session!!,
                    onLogout = {
                        scope.launch {
                            busy = true
                            error = ""
                            try {
                                val deviceUuid = prefs.getString(PREF_DEVICE_UUID, "") ?: ""
                                withContext(Dispatchers.IO) {
                                    FleetApi.logoutDriver(deviceUuid)
                                }
                            } catch (_: Exception) {
                            } finally {
                                context.stopService(Intent(context, TrackingService::class.java))
                                clearSession(prefs)
                                session = null
                                currentJob = CurrentJob("", "", 0.0, 0.0)
                                activeETickets = emptyList()
                                busy = false
                            }
                        }
                    }
                )

                if (activeETickets.isNotEmpty()) {
                    ActiveETicketsCard(
                        etickets = activeETickets,
                        onOpen = { selectedTicket ->
                            if (selectedTicket.url.isBlank()) {
                                Toast.makeText(
                                    context,
                                    "eTicket link is missing",
                                    Toast.LENGTH_SHORT
                                ).show()
                                return@ActiveETicketsCard
                            }

                            val intent = Intent(context, ETicketWebViewActivity::class.java).apply {
                                putExtra("eticket_url", selectedTicket.url)
                            }
                            context.startActivity(intent)
                        }
                    )
                }

                CurrentJobCard(
                    currentJob = currentJob,
                    deliveredQtyInput = deliveredQtyInput,
                    onDeliveredQtyChange = { deliveredQtyInput = it },
                    onUpdateDeliveredQty = {
                        scope.launch {
                            val value = deliveredQtyInput.toDoubleOrNull()
                            if (value == null) {
                                Toast.makeText(
                                    context,
                                    "Enter a valid delivered quantity",
                                    Toast.LENGTH_SHORT
                                ).show()
                                return@launch
                            }

                            busy = true
                            error = ""
                            try {
                                withContext(Dispatchers.IO) {
                                    FleetApi.updateDeliveredQty(session!!.truckNumber, value)
                                }
                                deliveredQtyInput = ""
                                refreshData()
                                Toast.makeText(
                                    context,
                                    "Delivered quantity updated",
                                    Toast.LENGTH_SHORT
                                ).show()
                            } catch (e: Exception) {
                                error = e.message ?: e.javaClass.simpleName ?: "Could not update delivered quantity"
                            } finally {
                                busy = false
                            }
                        }
                    }
                )

                DriverActionsCard(
                    onNavigate = {
                        val address = currentJob.address
                        if (address.isBlank()) {
                            Toast.makeText(context, "No job address found", Toast.LENGTH_SHORT).show()
                            return@DriverActionsCard
                        }

                        try {
                            val navUri = Uri.parse("google.navigation:q=${Uri.encode(address)}")
                            val intent = Intent(Intent.ACTION_VIEW, navUri).apply {
                                setPackage("com.google.android.apps.maps")
                            }
                            context.startActivity(intent)
                        } catch (_: Exception) {
                            val mapsUri = Uri.parse(
                                "https://www.google.com/maps/search/?api=1&query=${Uri.encode(address)}"
                            )
                            context.startActivity(Intent(Intent.ACTION_VIEW, mapsUri))
                        }
                    },
                    onCompleteJob = {
                        scope.launch {
                            busy = true
                            error = ""
                            try {
                                withContext(Dispatchers.IO) {
                                    FleetApi.completeJob(session!!.truckNumber)
                                }
                                refreshData()
                                Toast.makeText(context, "Job completed", Toast.LENGTH_SHORT).show()
                            } catch (e: Exception) {
                                error = e.message ?: e.javaClass.simpleName ?: "Could not complete job"
                            } finally {
                                busy = false
                            }
                        }
                    }
                )

                StatusUpdatesCard(
                    onEnRoute = {
                        sendEvent(scope, context) {
                            FleetApi.sendTruckEvent(session!!.truckNumber, "en_route_started")
                            refreshData()
                        }
                    },
                    onArrivedOnSite = {
                        sendEvent(scope, context) {
                            FleetApi.sendTruckEvent(session!!.truckNumber, "arrived_on_site")
                            refreshData()
                        }
                    },
                    onStartPour = {
                        sendEvent(scope, context) {
                            FleetApi.sendTruckEvent(session!!.truckNumber, "pouring_started")
                            refreshData()
                        }
                    },
                    onEndPour = {
                        sendEvent(scope, context) {
                            FleetApi.sendTruckEvent(session!!.truckNumber, "pouring_completed")
                            refreshData()
                        }
                    }
                )

                if (busy) {
                    Box(
                        modifier = Modifier.fillMaxWidth(),
                        contentAlignment = Alignment.Center
                    ) {
                        CircularProgressIndicator(color = Color(0xFFF97316))
                    }
                }*/
            }
        }
    }
}

private fun sendEvent(
    scope: CoroutineScope,
    context: Context,
    action: suspend () -> Unit
) {
    scope.launch {
        try {
            withContext(Dispatchers.IO) {
                action()
            }
            Toast.makeText(context, "Status updated", Toast.LENGTH_SHORT).show()
        } catch (e: Exception) {
            Toast.makeText(
                context,
                e.message ?: e.javaClass.simpleName ?: "Could not update status",
                Toast.LENGTH_SHORT
            ).show()
        }
    }
}

@Composable
private fun DriverLoginCard(
    pin: String,
    onPinChange: (String) -> Unit,
    busy: Boolean,
    onLogin: () -> Unit
) {
    SectionCard {
        Text(
            text = "Driver Login",
            color = Color.White,
            fontWeight = FontWeight.Bold,
            style = MaterialTheme.typography.headlineSmall
        )

        Spacer(modifier = Modifier.height(8.dp))

        Text(
            text = "Enter your 6-digit PIN",
            color = Color(0xFFD7E6F5)
        )

        Spacer(modifier = Modifier.height(16.dp))

        OutlinedTextField(
            value = pin,
            onValueChange = onPinChange,
            modifier = Modifier.fillMaxWidth(),
            label = {
                Text(
                    text = "6-Digit PIN",
                    color = Color(0xFFD7E6F5)
                )
            },
            singleLine = true,
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
            textStyle = TextStyle(color = Color.White),
            colors = OutlinedTextFieldDefaults.colors(
                focusedTextColor = Color.White,
                unfocusedTextColor = Color.White,
                focusedBorderColor = Color(0xFF66B2FF),
                unfocusedBorderColor = Color(0xFF4F7094),
                focusedLabelColor = Color(0xFFD7E6F5),
                unfocusedLabelColor = Color(0xFFD7E6F5),
                cursorColor = Color.White
            )
        )

        Spacer(modifier = Modifier.height(16.dp))

        Button(
            onClick = onLogin,
            enabled = !busy && pin.length == 6,
            modifier = Modifier.fillMaxWidth(),
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(0xFFF97316)
            )
        ) {
            Text(
                text = if (busy) "Signing In..." else "Sign In",
                color = Color.White
            )
        }
    }
}

@Composable
private fun SessionHeaderCard(
    session: DriverSession,
    onLogout: () -> Unit
) {
    SectionCard {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "BTC Tablet",
                    color = Color.White,
                    fontWeight = FontWeight.Bold,
                    style = MaterialTheme.typography.headlineSmall
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text("Driver: ${session.driverName}", color = Color.White)
                Text("Truck ${session.truckNumber}", color = Color(0xFFD7E6F5))
                Text("Signed In At: ${session.signedInAt}", color = Color(0xFFD7E6F5))
            }

            TextButton(onClick = onLogout) {
                Text("Logout", color = Color(0xFFF97316), fontWeight = FontWeight.Bold)
            }
        }
    }
}

@Composable
private fun ActiveETicketsCard(
    etickets: List<ActiveETicket>,
    onOpen: (ActiveETicket) -> Unit
) {
    SectionCard {
        Text(
            text = "Active eTickets Ready",
            color = Color.White,
            fontWeight = FontWeight.Bold,
            style = MaterialTheme.typography.headlineSmall
        )

        Spacer(modifier = Modifier.height(6.dp))

        Text(
            text = "${etickets.size} unsigned ticket${if (etickets.size == 1) "" else "s"} available for this truck.",
            color = Color(0xFFD7E6F5)
        )

        Spacer(modifier = Modifier.height(14.dp))

        etickets.forEach { eticket ->
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(
                    containerColor = if (eticket.isReassigned) {
                        Color(0xFF173B63)
                    } else {
                        Color(0xFF12304F)
                    }
                ),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 10.dp)
            ) {
                Column(
                    modifier = Modifier.padding(14.dp)
                ) {
                    Text(
                        text = "Ticket #${eticket.ticketNumber.ifBlank { "-" }}",
                        color = Color.White,
                        fontWeight = FontWeight.Bold,
                        style = MaterialTheme.typography.titleMedium
                    )

                    Spacer(modifier = Modifier.height(4.dp))

                    Text(
                        text = eticket.customerName.ifBlank { "Customer not listed" },
                        color = Color(0xFFD7E6F5)
                    )

                    Text(
                        text = "Original Truck: ${eticket.truckNumber.ifBlank { "-" }}",
                        color = Color(0xFFD7E6F5)
                    )

                    if (eticket.isReassigned) {
                        Spacer(modifier = Modifier.height(6.dp))
                        Text(
                            text = "Reassigned to this tablet",
                            color = Color(0xFFFFC46B),
                            fontWeight = FontWeight.Bold
                        )
                    }

                    Spacer(modifier = Modifier.height(12.dp))

                    Button(
                        onClick = { onOpen(eticket) },
                        modifier = Modifier.fillMaxWidth(),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = Color(0xFFF97316)
                        )
                    ) {
                        Icon(Icons.Default.OpenInNew, contentDescription = null)
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("Open eTicket")
                    }
                }
            }
        }
    }
}

@Composable
private fun CurrentJobCard(
    currentJob: CurrentJob,
    deliveredQtyInput: String,
    onDeliveredQtyChange: (String) -> Unit,
    onUpdateDeliveredQty: () -> Unit
) {
    SectionCard {
        Text(
            text = "Current Job",
            color = Color.White,
            fontWeight = FontWeight.Bold,
            style = MaterialTheme.typography.headlineSmall
        )

        Spacer(modifier = Modifier.height(12.dp))
        InfoRow("Job Number", currentJob.jobNumber.ifBlank { "-" })
        InfoRow("Assigned Address", currentJob.address.ifBlank { "-" })
        InfoRow("Ordered Qty", formatQty(currentJob.orderedQty))
        InfoRow("Delivered Qty", formatQty(currentJob.deliveredQty))

        Spacer(modifier = Modifier.height(16.dp))

        OutlinedTextField(
            value = deliveredQtyInput,
            onValueChange = onDeliveredQtyChange,
            modifier = Modifier.fillMaxWidth(),
            label = { Text("Delivered Qty", color = Color(0xFFD7E6F5)) },
            singleLine = true,
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal),
            textStyle = TextStyle(color = Color.White),
            colors = OutlinedTextFieldDefaults.colors(
                focusedTextColor = Color.White,
                unfocusedTextColor = Color.White,
                focusedBorderColor = Color(0xFF66B2FF),
                unfocusedBorderColor = Color(0xFF4F7094),
                focusedLabelColor = Color(0xFFD7E6F5),
                unfocusedLabelColor = Color(0xFFD7E6F5),
                cursorColor = Color.White
            )
        )

        Spacer(modifier = Modifier.height(12.dp))

        Button(
            onClick = onUpdateDeliveredQty,
            modifier = Modifier.fillMaxWidth(),
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFF97316))
        ) {
            Text("Update Delivered Qty", color = Color.White)
        }
    }
}

@Composable
private fun DriverActionsCard(
    onNavigate: () -> Unit,
    onCompleteJob: () -> Unit
) {
    SectionCard {
        Text(
            text = "Driver Actions",
            color = Color.White,
            fontWeight = FontWeight.Bold,
            style = MaterialTheme.typography.headlineSmall
        )

        Spacer(modifier = Modifier.height(12.dp))

        ActionButton(
            text = "Navigate to Job",
            icon = Icons.Default.Directions,
            primary = false,
            onClick = onNavigate
        )

        Spacer(modifier = Modifier.height(10.dp))

        ActionButton(
            text = "Complete Job",
            icon = Icons.Default.CheckCircle,
            primary = true,
            onClick = onCompleteJob
        )
    }
}

@Composable
private fun StatusUpdatesCard(
    onEnRoute: () -> Unit,
    onArrivedOnSite: () -> Unit,
    onStartPour: () -> Unit,
    onEndPour: () -> Unit
) {
    SectionCard {
        Text(
            text = "Status Updates",
            color = Color.White,
            fontWeight = FontWeight.Bold,
            style = MaterialTheme.typography.headlineSmall
        )

        Spacer(modifier = Modifier.height(12.dp))

        ActionButton(
            text = "En Route",
            icon = Icons.Default.LocalShipping,
            primary = true,
            onClick = onEnRoute
        )

        Spacer(modifier = Modifier.height(10.dp))

        ActionButton(
            text = "Arrived On Site",
            icon = Icons.Default.LocationOn,
            primary = false,
            onClick = onArrivedOnSite
        )

        Spacer(modifier = Modifier.height(10.dp))

        ActionButton(
            text = "Start Pour",
            icon = Icons.Default.PlayArrow,
            primary = true,
            onClick = onStartPour
        )

        Spacer(modifier = Modifier.height(10.dp))

        ActionButton(
            text = "End Pour",
            icon = Icons.Default.StopCircle,
            primary = false,
            onClick = onEndPour
        )
    }
}

@Composable
private fun ErrorCard(message: String) {
    Card(
        colors = CardDefaults.cardColors(containerColor = Color(0xFF5A1F1F)),
        shape = RoundedCornerShape(18.dp)
    ) {
        Text(
            text = message,
            color = Color.White,
            modifier = Modifier.padding(16.dp)
        )
    }
}

@Composable
private fun SectionCard(content: @Composable ColumnScope.() -> Unit) {
    Card(
        shape = RoundedCornerShape(22.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF102742)),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(18.dp),
            content = content
        )
    }
}

@Composable
private fun InfoRow(label: String, value: String) {
    Column(modifier = Modifier.fillMaxWidth()) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(label, color = Color(0xFFD7E6F5))
            Text(value, color = Color.White, fontWeight = FontWeight.Bold)
        }
        Spacer(modifier = Modifier.height(8.dp))
        HorizontalDivider(color = Color(0x334F7094))
        Spacer(modifier = Modifier.height(8.dp))
    }
}

@Composable
private fun ActionButton(
    text: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    primary: Boolean,
    onClick: () -> Unit
) {
    Button(
        onClick = onClick,
        modifier = Modifier.fillMaxWidth(),
        colors = ButtonDefaults.buttonColors(
            containerColor = if (primary) Color(0xFFF97316) else Color(0xFF1A4F9B)
        ),
        shape = RoundedCornerShape(18.dp)
    ) {
        Icon(icon, contentDescription = null, tint = Color.White)
        Spacer(modifier = Modifier.width(8.dp))
        Text(text, color = Color.White, fontWeight = FontWeight.Bold)
    }
}

private fun loadSavedSession(prefs: android.content.SharedPreferences): DriverSession? {
    val driverId = prefs.getInt(PREF_DRIVER_ID, -1)
    val driverName = prefs.getString(PREF_DRIVER_NAME, "") ?: ""
    val truckNumber = prefs.getString(PREF_TRUCK_NUMBER, "") ?: ""
    val signedInAt = prefs.getString(PREF_SIGNED_IN_AT, "") ?: ""

    return if (driverId > 0 && driverName.isNotBlank() && truckNumber.isNotBlank()) {
        DriverSession(driverId, driverName, truckNumber, signedInAt)
    } else {
        null
    }
}

private fun saveSession(
    prefs: android.content.SharedPreferences,
    session: DriverSession
) {
    prefs.edit {
        putInt(PREF_DRIVER_ID, session.driverId)
        putString(PREF_DRIVER_NAME, session.driverName)
        putString(PREF_TRUCK_NUMBER, session.truckNumber)
        putString(PREF_SIGNED_IN_AT, session.signedInAt)
    }
}

private fun clearSession(prefs: android.content.SharedPreferences) {
    prefs.edit {
        remove(PREF_DRIVER_ID)
        remove(PREF_DRIVER_NAME)
        remove(PREF_TRUCK_NUMBER)
        remove(PREF_SIGNED_IN_AT)
    }
}

private fun formatQty(value: Double): String {
    return if (value % 1.0 == 0.0) value.toInt().toString() else value.toString()
}