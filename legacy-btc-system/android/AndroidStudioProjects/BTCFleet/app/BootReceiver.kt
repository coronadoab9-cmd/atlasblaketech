package com.bigtownconcrete.btcfleet

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import androidx.core.content.ContextCompat

class BootReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent?) {
        if (intent?.action == Intent.ACTION_BOOT_COMPLETED) {
            val prefs = context.getSharedPreferences("btc_fleet_prefs", Context.MODE_PRIVATE)
            val truckNumber = prefs.getString("assigned_truck_number", "") ?: ""
            val truckLocked = prefs.getBoolean("truck_locked", false)

            if (truckLocked && truckNumber.isNotBlank()) {
                val serviceIntent = Intent(context, TrackingService::class.java)
                ContextCompat.startForegroundService(context, serviceIntent)
            }
        }
    }
}