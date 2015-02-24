package com.androidexample.gcm;

import java.util.List;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

@SuppressWarnings("rawtypes")
public class messageAdapter extends ArrayAdapter {
	private LayoutInflater inflater;
	List<messageClass> messages;
	@SuppressWarnings("unchecked")
	public messageAdapter(Activity activity, List<messageClass> items) {
		super(activity, R.layout.message_layout, items);
		messages = items;
		inflater = activity.getWindow().getLayoutInflater();
	}
	
	@SuppressLint("ViewHolder")
	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
		View view = inflater.inflate(R.layout.message_layout, parent, false);
		Log.d("#MyAppDebug", "messageAdapter - getView - position"+position);		
		TextView title = (TextView)view.findViewById(R.id.mTitle);
		TextView body = (TextView)view.findViewById(R.id.mMSG);
		TextView timestamp = (TextView)view.findViewById(R.id.mTS);
		
		title.setText(messages.get(position).Title);
		body.setText(messages.get(position).Body);
		timestamp.setText(messages.get(position).TimeStamp);
		return view;
	}
}
