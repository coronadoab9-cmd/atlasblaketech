package com.bigtownconcrete.btcfleet

import android.Manifest
import android.annotation.SuppressLint
import android.content.pm.PackageManager
import android.os.Bundle
import android.webkit.GeolocationPermissions
import android.webkit.PermissionRequest
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.webkit.JavascriptInterface
import android.widget.Toast
import android.view.WindowManager
import androidx.activity.ComponentActivity
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat

class ETicketWebViewActivity : ComponentActivity() {



    private lateinit var webView: WebView

    private var pendingPermissionRequest: PermissionRequest? = null
    private var pendingGeoOrigin: String? = null
    private var pendingGeoCallback: GeolocationPermissions.Callback? = null

    private val cameraPermissionLauncher =
        registerForActivityResult(ActivityResultContracts.RequestPermission()) { granted ->
            val request = pendingPermissionRequest
            pendingPermissionRequest = null

            if (granted) {
                request?.grant(request.resources)
            } else {
                request?.deny()
                Toast.makeText(
                    this,
                    "Camera permission denied.",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // FULLSCREEN (hides status bar completely)
        window.setFlags(
            WindowManager.LayoutParams.FLAG_FULLSCREEN,
            WindowManager.LayoutParams.FLAG_FULLSCREEN
        )


        // Keep screen awake while signing eTickets
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)

        // Set brightness to 80%
        val layoutParams = window.attributes
        layoutParams.screenBrightness = 0.8f
        window.attributes = layoutParams

        webView = WebView(this)
        setContentView(webView)

        webView.addJavascriptInterface(
            object {
                @JavascriptInterface
                fun exitEticket() {
                    runOnUiThread {
                        finish()
                    }
                }
            },
            "BTCFleetAndroid"
        )

        val eticketUrl = intent.getStringExtra("eticket_url").orEmpty()

        if (eticketUrl.isBlank()) {
            Toast.makeText(this, "eTicket link is missing.", Toast.LENGTH_LONG).show()
            finish()
            return
        }

        val settings = webView.settings
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.databaseEnabled = true
        settings.loadsImagesAutomatically = true
        settings.mediaPlaybackRequiresUserGesture = false
        settings.allowFileAccess = true
        settings.allowContentAccess = true
        settings.setSupportZoom(true)
        settings.builtInZoomControls = false
        settings.displayZoomControls = false
        settings.cacheMode = WebSettings.LOAD_DEFAULT
        settings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
        settings.setGeolocationEnabled(true)

        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(
                view: WebView?,
                request: WebResourceRequest?
            ): Boolean {
                return false
            }

            override fun shouldOverrideUrlLoading(
                view: WebView?,
                url: String?
            ): Boolean {
                return false
            }
        }

        webView.webChromeClient = object : WebChromeClient() {

            override fun onPermissionRequest(request: PermissionRequest) {
                runOnUiThread {
                    val wantsCamera =
                        request.resources.contains(PermissionRequest.RESOURCE_VIDEO_CAPTURE)

                    if (!wantsCamera) {
                        request.grant(request.resources)
                        return@runOnUiThread
                    }

                    if (
                        ContextCompat.checkSelfPermission(
                            this@ETicketWebViewActivity,
                            Manifest.permission.CAMERA
                        ) == PackageManager.PERMISSION_GRANTED
                    ) {
                        request.grant(request.resources)
                    } else {
                        pendingPermissionRequest?.deny()
                        pendingPermissionRequest = request
                        cameraPermissionLauncher.launch(Manifest.permission.CAMERA)
                    }
                }
            }

            override fun onGeolocationPermissionsShowPrompt(
                origin: String?,
                callback: GeolocationPermissions.Callback?
            ) {
                runOnUiThread {
                    val fineGranted =
                        ContextCompat.checkSelfPermission(
                            this@ETicketWebViewActivity,
                            Manifest.permission.ACCESS_FINE_LOCATION
                        ) == PackageManager.PERMISSION_GRANTED
                    val coarseGranted =
                        ContextCompat.checkSelfPermission(
                            this@ETicketWebViewActivity,
                            Manifest.permission.ACCESS_FINE_LOCATION
                        ) == PackageManager.PERMISSION_GRANTED

                    if (fineGranted || coarseGranted) {
                        callback?.invoke(origin, true, false)
                    } else {
                        pendingGeoOrigin = origin
                        pendingGeoCallback = callback

                        ActivityCompat.requestPermissions(
                            this@ETicketWebViewActivity,
                            arrayOf(
                                Manifest.permission.ACCESS_FINE_LOCATION,
                                Manifest.permission.ACCESS_COARSE_LOCATION
                            ),
                            2001
                        )
                    }
                }
            }
        }

        if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState)
        } else {
            webView.loadUrl(eticketUrl)
        }
    }
    @Deprecated("Deprecated in Java")
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)

        if (requestCode == 2001) {
            var granted = false

            permissions.forEachIndexed { index, permission ->
                if (
                    (permission == Manifest.permission.ACCESS_FINE_LOCATION ||
                     permission == Manifest.permission.ACCESS_COARSE_LOCATION) &&
                    grantResults.getOrNull(index) == PackageManager.PERMISSION_GRANTED
                ) {
                    granted = true
                }
            }

            pendingGeoCallback?.invoke(pendingGeoOrigin, granted, false)
            pendingGeoOrigin = null
            pendingGeoCallback = null

            if (!granted) {
                Toast.makeText(
                    this,
                    "Location permission denied.",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        webView.saveState(outState)
    }

    override fun onResume() {
        super.onResume()
        webView.onResume()
    }

    override fun onPause() {
        webView.onPause()
        super.onPause()
    }

    override fun onDestroy() {
        pendingPermissionRequest?.deny()
        pendingPermissionRequest = null
        pendingGeoOrigin = null
        pendingGeoCallback = null

        webView.apply {
            loadUrl("about:blank")
            stopLoading()
            webChromeClient = null
            destroy()
        }

        super.onDestroy()
    }

    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        if (::webView.isInitialized && webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}