package com.sepeiupdates.gcm;

import java.util.HashMap;
import java.util.Map;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.view.Window;
import android.webkit.CookieManager;
import android.webkit.CookieSyncManager;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;

@SuppressLint("SetJavaScriptEnabled")
public class PEIWebViewActivity extends Activity {
	private WebView browser;
	public static String url;
	public static String regId;
	
	@SuppressWarnings("static-access")
	@SuppressLint("NewApi")
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		// TODO Auto-generated method stub
		super.onCreate(savedInstanceState);

		getWindow().requestFeature(Window.FEATURE_PROGRESS);

		setContentView(R.layout.web_view);
		
		getActionBar().setDisplayShowTitleEnabled(false);
		getActionBar().setBackgroundDrawable(getResources().getDrawable(R.drawable.action_bar));
		getActionBar().setHomeAsUpIndicator(getResources().getDrawable(R.drawable.ic_action_back));
		
		ConnectivityManager connectivityManager 
        = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
		NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
		
		if((activeNetworkInfo != null && activeNetworkInfo.isConnected()) == false) {
			getActionBar().setBackgroundDrawable(getResources().getDrawable(R.drawable.action_bar_no_connection));
		}
		
		getWindow().setFeatureInt( Window.FEATURE_PROGRESS, Window.PROGRESS_VISIBILITY_ON);

		// Getting regId, URL from intent
		Intent webIntent = getIntent();
		url = webIntent.getStringExtra("URL");
		regId = webIntent.getStringExtra("regId");
		

		Log.d("#MyAppDebug PEIWebView onCreate","onCreate");
		browser = (WebView) findViewById(R.id.webview1);
		
		final ProgressDialog pd = new ProgressDialog(this, R.style.Theme_MyCustomProgressDialog);
		pd.setTitle("Loading WebPage");
		pd.setMessage("0% Completed");
		pd.setCancelable(true);
		pd.setProgressStyle(pd.STYLE_SPINNER);
		pd.setMax(100);
		pd.show();
		
		browser.getSettings().setJavaScriptEnabled(true);
		browser.getSettings().setSupportZoom(true);
		browser.getSettings().setBuiltInZoomControls(true);
		browser.getSettings().setDisplayZoomControls(false);
		browser.getSettings().setUseWideViewPort(true);
		browser.getSettings().setLoadWithOverviewMode(true);
		
		browser.setWebChromeClient(new WebChromeClient() {
			public void onProgressChanged(WebView view, int progress) {
			     // Activities and WebViews measure progress with different scales.
			     // The progress meter will automatically disappear when we reach 100%
				   Log.d("#MyAppDebug PEIWebView","progress "+progress);
				   pd.setTitle("Loading WebPage");
				   pd.setProgress(progress);
				   pd.setMessage(progress+"% Completed");
				   if(progress > 80) {
					   if(pd.isShowing() && pd!=null) {
						   pd.dismiss();
					   }
				   }
				   if((progress < 25) && !pd.isShowing()){
					   pd.show();
				   }
			     super.onProgressChanged(view, progress);
			   }
			 });
		browser.setWebViewClient(new MyBrowser());
		//browser.loadUrl("http://www.google.com");
		
		open(browser);
	}


	public void open(View view){
		Log.d("#MyAppDebug PEIWebView open","open - url "+url);
		//url = "http://www.google.com";

		browser.getSettings().setLoadsImagesAutomatically(true);
		browser.getSettings().setJavaScriptEnabled(true);
		
		browser.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
		
		CookieManager cookieManager = CookieManager.getInstance();
		cookieManager.removeSessionCookie();
		CookieSyncManager.getInstance().sync();
		cookieManager.removeAllCookie();
		cookieManager.setAcceptCookie(false);
		
		Map<String, String> getCookie = new HashMap<String,String>();
		getCookie.put("Cookie", "regId="+regId+";url="+url);

		browser.loadUrl("http:"+Config.YOUR_SERVER_URL+":8080/getMessages.php",getCookie);

	}
	private class MyBrowser extends WebViewClient {
		@Override
		public boolean shouldOverrideUrlLoading(WebView view, String url) {
			Log.d("#MyAppDebug WebViewClient", url);
			view.loadUrl(url);
			return true;
		}
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		//getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}
}
