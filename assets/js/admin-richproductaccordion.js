

function richproductaccordion_show_accordion(ob_accordion) {	
	jQuery(document).ready(function($){		
		if( jQuery(ob_accordion).parent().find(".inside").css("display") == "block") {
			jQuery(ob_accordion).parent().find(".inside").css("display","none");
			jQuery(ob_accordion).parent().addClass("closed");
		} else {
			jQuery(ob_accordion).parent().find(".inside").css("display","block");
			jQuery(ob_accordion).parent().removeClass("closed");
		}		
	});	
}

function richproductaccordion_changeboolvalue(ob_bool){
	jQuery(document).ready(function($){
		
		var field_bool_val = $(ob_bool).attr("data_attr");
		if(field_bool_val=="yes") {
			field_bool_val="no";
		} else {
			field_bool_val="yes";
		}
		$(ob_bool).attr("data_attr",field_bool_val); 
		if(field_bool_val=="yes") {
			$(ob_bool).find(".cls-bool-field-ins").animate({ right:0, left:'50%'},function(){
				 $(this).css("background","#29e58e");
				 $(this).find("input").each(function(){
						if( $(this).val() == "yes" ) {
							$(this).prop( "checked", "checked" );
						}
				 });
			});
		} else {
			$(ob_bool).find(".cls-bool-field-ins").animate({ left:0,right:'50%'},function(){
				 
				 $(this).css("background","#ccc");
				 $(this).find("input").each(function(){
						if( $(this).val() == "no" ) {
							$(this).prop( "checked", "checked" );
						}
				 });
				 
			});
		}	
		$(".widget-control-save").removeAttr("disabled");
	});
}

jQuery(document).ready(function(){

	jQuery('.richproductaccordion-color-field-1').wpColorPicker();
	jQuery('.richproductaccordion-color-field-2').wpColorPicker();
	jQuery('.richproductaccordion-color-field-3').wpColorPicker();
	jQuery('.richproductaccordion-color-field-4').wpColorPicker();
	jQuery('.richproductaccordion-color-field-5').wpColorPicker(); 
	jQuery('.richproductaccordion-color-field-6').wpColorPicker(); 
	jQuery('.richproductaccordion-color-field-7').wpColorPicker(); 
	jQuery('.richproductaccordion-color-field-8').wpColorPicker(); 
	jQuery('.richproductaccordion-color-field-9').wpColorPicker(); 
	
	 jQuery(document).ajaxComplete(function(d){  
		jQuery('.rwapcp-color-field').each(function(){
		 
			var obj_parent = jQuery(this).parent().parent().parent();
			jQuery(this).removeClass("wp-color-picker"); 
			jQuery(this).removeAttr("style");
			jQuery(this).show();
			jQuery(this).parent().find('.wp-picker-clear').remove();
			var hmt_color_picker_val =  jQuery(this).val();
			var hmt_color_picker = jQuery(this).parent().html();
			jQuery(obj_parent).html("<td class='text-fld-color tp-label'>"+jQuery(obj_parent).find("td:eq(0)").text()+"</td><td>"+hmt_color_picker+"</td>");
			jQuery(obj_parent).find(".richproductaccordion-color-field-1").wpColorPicker();  
			jQuery(obj_parent).find(".richproductaccordion-color-field-2").wpColorPicker();  
			jQuery(obj_parent).find(".richproductaccordion-color-field-3").wpColorPicker();  
			jQuery(obj_parent).find(".richproductaccordion-color-field-4").wpColorPicker();  
			jQuery(obj_parent).find(".richproductaccordion-color-field-5").wpColorPicker();  
			jQuery(obj_parent).find('.richproductaccordion-color-field-6').wpColorPicker(); 
			jQuery(obj_parent).find('.richproductaccordion-color-field-7').wpColorPicker(); 
			jQuery(obj_parent).find('.richproductaccordion-color-field-8').wpColorPicker(); 
			jQuery(obj_parent).find('.richproductaccordion-color-field-9').wpColorPicker(); 
			jQuery(obj_parent).find("td").each(function(){
				if(jQuery.trim(jQuery(this).text())=="" || jQuery.trim(jQuery(this).text())=="Color value"){
					jQuery(this).remove();
				}
			}); 
		}); 
	});  
	 		
	setInterval(function(){
		jQuery('.richproductaccordion-admin-widget td').each(function(){
			if(jQuery(this).find("input").length <= 0 && jQuery(this).find("select").length <= 0 && (jQuery.trim(jQuery(this).text())=="" || jQuery.trim(jQuery(this).text())=="Color value")){
				jQuery(this).remove();
			} 
		});
		jQuery('.richproductaccordion-admin-widget .text-fld-color.tp-label').each(function(){
			if(jQuery.trim(jQuery(this).text())=="" || jQuery.trim(jQuery(this).text())=="Color value"){
				jQuery(this).remove();
			} 
		});
		jQuery('.richproductaccordion-admin-widget .cls-clr-fld').each(function(){
			 if(jQuery.trim(jQuery(this).text())=="" || jQuery.trim(jQuery(this).text())=="Color value"){
				jQuery(this).remove();
			 } 
		}); 
	},900);	

}); 
 
function ck_category_check(ob_check) {
		var is_checked_len = jQuery(ob_check).parent().parent().find('input:checked').length; 
		if( is_checked_len == 0 ) {
			ob_check.checked = true;
		} 
}

function rwapcp_sel_change_categories_on_type(ob){
	(function( $ ) {  
		$(function() {
			var category_type = $(ob).val();
			var loading_image =  '<img src="'+richproductaccordion.rwapcp_media+'images/loader.gif" />';
			$(ob).parent().parent().parent().parent().parent().parent().find(".fld_checkbox_category_id").html('<div class="select-ajax-option">'+loading_image+"</div>");
			
			var category_field_name = "";
			if( $(ob).parent().parent().parent().parent().parent().parent().find(".chk-field-name-rwapcp_category").length > 0 ) {
				 category_field_name = $(ob).parent().parent().parent().parent().parent().parent().find(".chk-field-name-rwapcp_category").attr("data-value");
			} 
			 
			$.ajax({
				url: richproductaccordion.rwapcp_ajax_url,
				security: richproductaccordion.rwapcp_security,
				data: {'action':'rwapcp_getCategoriesOnTypes',security: richproductaccordion.rwapcp_security,category_field_name:category_field_name,category_type:category_type},
				success:function(data) {  
					$(ob).parent().parent().parent().parent().parent().parent().find(".fld_checkbox_category_id").html(data);
				},error: function(errorThrown){ console.log(errorThrown);}
			}); 	
			
			$.ajax({
				url: richproductaccordion.rwapcp_ajax_url,
				security: richproductaccordion.rwapcp_security,
				data: {'action':'rwapcp_getCategoriesRadioOnTypes',security: richproductaccordion.rwapcp_security,category_field_name:category_field_name,category_type:category_type},
				success:function(data) { 
				 
					 $(ob).parent().parent().parent().parent().parent().parent().find(".rwapcp_default_category_open_opt").html(data); 
				},error: function(errorThrown){ console.log(errorThrown);}
			});  
			
		});  
		
	})( jQuery );	

}   