package com.bigtownconcrete.btcfleet

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import androidx.core.content.ContextCompat

class BootReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent?) {
        if (intent?.action == Intent.ACTION_BOOT_COMPLETED) {
            val prefs = context.getSharedPreferences("btc_fleet_prefs", Context.MODE_PRIVATE)
            val truckNumber = prefs.getString("truck_number", "") ?: ""
            val driverId = prefs.getInt("driver_id", -1)

            if (truckNumber.isNotBlank() && driverId > 0) {
                val serviceIntent = Intent(context, TrackingService::class.java)
                ContextCompat.startForegroundService(context, serviceIntent)
            }

            val launchIntent = Intent(context, MainActivity::class.java).apply {
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
                addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
            }

            context.startActivity(launchIntent)
        }
    }
}