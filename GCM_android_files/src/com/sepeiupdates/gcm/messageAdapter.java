package com.sepeiupdates.gcm;

import java.util.List;

import com.sepeiupdates.gcm.Config.ConnectionStatus;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.graphics.Typeface;
import android.graphics.drawable.BitmapDrawable;
import android.text.SpannableString;
import android.text.style.StyleSpan;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

@SuppressLint("ResourceAsColor")
@SuppressWarnings("rawtypes")
public class messageAdapter extends ArrayAdapter {
	private LayoutInflater inflater;
	private MainActivity activityMain;
	List<messageClass> messages;

	float width;
	float height;
	@SuppressWarnings("unchecked")
	public messageAdapter(Activity activity, List<messageClass> items) {
		super(activity, R.layout.message_layout, items);
		activityMain = (MainActivity)activity;
		messages = items;
		inflater = activity.getWindow().getLayoutInflater();
	}
	
	@SuppressWarnings("deprecation")
	@SuppressLint({ "ViewHolder", "CutPasteId" })
	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
		NewsHolder holder = null;
		View view = convertView;

		if(view == null) {
			view = inflater.inflate(R.layout.message_layout, parent, false);
		}
		else
		{
			holder = (NewsHolder)view.getTag();
		}
		Log.d("#MyAppDebug", "messageAdapter - getView - position"+position);			

		holder = new NewsHolder();
		holder.tag = (TextView)view.findViewById(R.id.mTag);
		holder.title = (TextView)view.findViewById(R.id.mTitle);

		holder.body = (TextView)view.findViewById(R.id.mMSG);
		holder.timestamp = (TextView)view.findViewById(R.id.mTS);

		BitmapDrawable bG;
		
		holder.tag.setText(messages.get(position).tag);
		holder.tag.setBottom(R.id.mTS);
		
		holder.title.setText(messages.get(position).Title);
		holder.body.setText(messages.get(position).Body);
		
		holder.timestamp.setText(messages.get(position).TimeStamp);
		
		holder.tag.setBackgroundColor(0);
		if(messages.get(position).IsRead == 0) {
			//holder.title.setTextColor(view.getResources().getColor(R.color.black));
			
			SpannableString spanString = new SpannableString(holder.title.getText());
			//spanString.setSpan(new UnderlineSpan(), 0, spanString.length(), 0);
			//spanString.setSpan(new StyleSpan(Typeface.ITALIC), 0, spanString.length(), 0);
			holder.title.setTypeface(Typeface.create("sans-serif-light", Typeface.NORMAL));
			spanString.setSpan(new StyleSpan(Typeface.BOLD), 0, spanString.length(), 0);
			holder.title.setText(spanString);
			
			holder.body.setTypeface(Typeface.create("sans-serif-condensed", Typeface.NORMAL));
			//spanString = new SpannableString(holder.body.getText());
			//spanString.setSpan(new UnderlineSpan(), 0, spanString.length(), 0);
			//spanString.setSpan(new StyleSpan(Typeface.BOLD), 0, spanString.length(), 0);
			//spanString.setSpan(new StyleSpan(Typeface.ITALIC), 0, spanString.length(), 0);
			//holder.body.setText(spanString);
			
			spanString = new SpannableString(holder.timestamp.getText());
			//spanString.setSpan(new UnderlineSpan(), 0, spanString.length(), 0);
			spanString.setSpan(new StyleSpan(Typeface.BOLD), 0, spanString.length(), 0);
			//spanString.setSpan(new StyleSpan(Typeface.ITALIC), 0, spanString.length(), 0);
			holder.timestamp.setText(spanString);
			
			//setting different tag background
			int TagN = (position % 4);
			if(TagN == 0) {
				bG = (BitmapDrawable)view.getResources().getDrawable(R.drawable.tag_lgreen);
			}
			else if(TagN == 1) {
				bG = (BitmapDrawable)view.getResources().getDrawable(R.drawable.tag_sgreen);
			}
			else if(TagN == 2) {
				bG = (BitmapDrawable)view.getResources().getDrawable(R.drawable.tag_syellow);
			}
			else if(TagN == 3) {
				bG = (BitmapDrawable)view.getResources().getDrawable(R.drawable.tag_fred);
			}
			else {
				bG = (BitmapDrawable)view.getResources().getDrawable(R.drawable.tag_green);
			}
			//holder.tag.setBackgroundResource(R.drawable.tag_green);
			//holder.body.setBackgroundColor(view.getResources().getColor(R.color.lgreen));
			//holder.timestamp.setBackgroundColor(view.getResources().getColor(R.color.lgreen));
		}
		else {
			holder.timestamp.setTypeface(Typeface.create("sans-serif-thin", Typeface.NORMAL));
			holder.body.setTypeface(Typeface.create("sans-serif-thin", Typeface.NORMAL));
			holder.title.setTypeface(Typeface.create("sans-serif-thin", Typeface.NORMAL));
			
			bG = (BitmapDrawable)view.getResources().getDrawable(R.drawable.tag_cgray);
		}
		holder.tag.setBackgroundDrawable(bG);
		
		if(activityMain.isScrollingUp() == true) {
			activityMain.getActionBar().hide();
		}
		else {
			activityMain.getActionBar().show();
		}
		/*
		if(position == 0) {
			holder.title.setText(MainActivity.conStatus.toString());
			holder.title.setBackgroundColor(view.getResources().getColor(R.color.fred));
			holder.body.setText("");
			holder.body.setBackgroundColor(view.getResources().getColor(R.color.fred));
			holder.timestamp.setText("");
			holder.timestamp.setBackgroundColor(view.getResources().getColor(R.color.fred));
		}
		else {
			holder.title.setBackgroundColor(view.getResources().getColor(R.color.white));
			holder.body.setBackgroundColor(view.getResources().getColor(R.color.white));
			holder.timestamp.setBackgroundColor(view.getResources().getColor(R.color.white));
		}*/
		
		Log.d("#MyAppDebug ConnStatus", "messageAdapter - getView - conStatus" + MainActivity.conStatus);
		if(MainActivity.conStatus == ConnectionStatus.REGISTER_E_END) {
			Log.d("#MyAppDebug ConnStatus", "messageAdapter - getView - REGISTER_E_END");
		}
		else if(MainActivity.conStatus == ConnectionStatus.REGSITER_ERROR) {
			Log.d("#MyAppDebug ConnStatus", "messageAdapter - getView - REGSITER_ERROR");
		}
			
		view.setTag(holder);
		return view;
	}
	static class NewsHolder{
	      public TextView tag;
	      TextView title;
	      TextView body;
	      TextView timestamp;
	      }
}
