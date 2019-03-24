if((typeof jQuery === 'undefined') && window.jQuery) {
	jQuery = window.jQuery;
} else if((typeof jQuery !== 'undefined') && !window.jQuery) {
	window.jQuery = jQuery;
}
var flg_v1 = 0; 	



/************************************/
/********** NEW LAYOUT START ********/
/************************************/
 
function rwapcp_init_elements(){
	jQuery(document).ready(function($){
		$("#richproductaccordion .wea_content .item-posts").each(function(){  
			rwapcp_ikh_resize_elements($(this).parent().find(".pst-item").attr("id")); 
		});
	});
} 

function rwapcp_reload_current_elements(ipc_crid){
	jQuery(document).ready(function($){ 
		rwapcp_ikh_resize_elements(ipc_crid); 
		var ikh_tm_id = setTimeout(function(){ 
			rwapcp_ikh_resize_elements(ipc_crid);   
			clearTimeout(ikh_tm_id);
		},200);  
	});
} 

function rwapcp_ikh_resize_elements(elementId) {
	jQuery(document).ready(function($){
			var root_element = $("#"+elementId).parent().find(".item-posts"); 
			
			if( $(root_element).find(".item-posts-wrap").find("div").length > 0) {
				$(root_element).css("display","block"); 
			}
			
			var ikh_config_elements = [];   
			ikh_config_elements["ikh_templates"] = $(root_element).find(".ikh_templates").val(); 
			// "fit_to_sides"; // fixed_width_left // fixed_width_center // fit_to_sides  
			ikh_config_elements["ikh_posts_loads_from"] = $(root_element).find(".ikh_posts_loads_from").val(); 
			// "left"; // right // bottom // top // none // left 
			ikh_config_elements["ikh_border_difference"] = parseInt($(root_element).find(".ikh_border_difference").val());
			ikh_config_elements["ikh_margin_bottom"] =   parseInt($(root_element).find(".ikh_margin_bottom").val());
			ikh_config_elements["ikh_image_height"] = parseInt($(root_element).find(".ikh_image_height").val());
			ikh_config_elements["ikh_margin_left"] = parseInt($(root_element).find(".ikh_margin_left").val());
			ikh_config_elements["ikh_item_area_width"] = parseInt($(root_element).find(".ikh_item_area_width").val());
				
			if(ikh_config_elements["ikh_templates"]=="fit_to_sides") {
				rwapcp_ikh_fit_to_sides(ikh_config_elements,root_element);
			} else if(ikh_config_elements["ikh_templates"]=="fixed_width_left") {
				rwapcp_ikh_fixed_width_left(ikh_config_elements,root_element);
			} else if(ikh_config_elements["ikh_templates"]=="fixed_width_center") {
				rwapcp_ikh_fixed_width_center(ikh_config_elements,root_element);
			}
			
			$(root_element).find(".ik-post-load-more").show();
			$(root_element).find(".rwapcp-simple-paging").show(); 
	});	
}

function rwapcp_ikh_fit_to_sides(ikh_config_elements,root_element) {

	jQuery(document).ready(function($){
	
		var ikh_element = $(root_element); 
		var ikh_border_difference = ikh_config_elements["ikh_border_difference"];
		var ikh_margin_bottom = ikh_config_elements["ikh_margin_bottom"];
		var ikh_image_height = ikh_config_elements["ikh_image_height"];
		var ikh_margin_left = ikh_config_elements["ikh_margin_left"];
		var ikh_item_area_width = ikh_config_elements["ikh_item_area_width"]; 
	 
		var ikh_main_width = parseInt($(ikh_element).width()); 
		var ikh_flg_loop = 0; 
		var ikh_min_width = ((ikh_item_area_width)/2)/2;
		var ikh_max_width = ikh_item_area_width;    
		
		if(ikh_main_width<=ikh_item_area_width) {
				$(ikh_element).find(".ikh-post-item-box").removeAttr("style");
				$(ikh_element).find(".ikh-post-item").removeAttr("style");						
				$(ikh_element).find(".ikh-post-item-box").css("width","100% ");
				$(ikh_element).find(".ikh-post-item-box").css("margin-bottom",ikh_margin_bottom+"px ");
				$(ikh_element).find(".ikh-post-item-box ").css("visibility","visible");
				$(ikh_element).find(".ikh-post-item").css("width",(ikh_main_width-ikh_border_difference)+"px ");
				$(ikh_element).find(".ikh-post-item").css("height","auto");	
				$(ikh_element).find(".ik-post-load-more").removeAttr("style").css("position","relative");
				$(ikh_element).find(".rwapcp-simple-paging").removeAttr("style").css("position","relative");	 
		} else {
		
			// set width of each items 
			for(var ikh = ikh_max_width; ikh >= ikh_min_width; ikh--) {
				for( var ikhw = 60; ikhw > 0; ikhw-- ) {
					var ikh_items_width = ikh * ikhw;  
					ikh_items_width = ikh_items_width-ikh_margin_left-ikh_border_difference;
					if( ikh_main_width >= ikh_items_width ) {
						var ikh_remaining_width = ikh_main_width-ikh_items_width;
						var ikh_prev = ikh;
						ikh = ((ikh_remaining_width/ikhw)+ikh); 
						if(ikh>(ikh_max_width+((((ikh_item_area_width + ikh_margin_left)/2)/2)))) { 
							ikhw=ikhw+1;
							ikh = ikh_prev;
							ikh_items_width = ikh * ikhw; 
							ikh_items_width = ikh_items_width-ikh_margin_left-ikh_border_difference;
							ikh_remaining_width = ikh_main_width-ikh_items_width;
							ikh = ((ikh_remaining_width/ikhw)+ikh);  
						}
						 
						var ikh_first_left = 0;
						var ikh_last_left = ikh_first_left;
						var ikh_num_lines = 0;
						for ( var ikh_j1=0; ikh_j1 < $(ikh_element).find(".ikh-post-item-box").length; ikh_j1++ ) {
							
							var ikh_mrg_lft = 0; 
							if( ikh_j1 == 0 ) {  
								ikh_mrg_lft = 0;
							} else {
								if( (ikh_j1%ikhw) == 0 ) {
									ikh_last_left = ikh_first_left;
									ikh_mrg_lft = 0;
									ikh_num_lines++;
								} else { 
									ikh_last_left = ikh_last_left + ikh; 
									  ikh_mrg_lft = ikh_margin_left-ikh_border_difference;
								}
								
								if( ((ikh_j1-1)%(ikhw)) == 0 && ikhw>1 ) 
									ikh_last_left = ikh_last_left - ikh_margin_left-ikh_border_difference;
								 
							}	 
							  
							if( (ikh_j1%ikhw) == 0 && ikhw>1 ) {
								$(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").css("width",(ikh-ikh_margin_left)+"px");
							}else{
								$(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").css("width",(ikh)+"px");
							} 
							 
							
							if( (ikh_j1%ikhw) == 0 ) { 									
								$(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").find(".ikh-post-item").css("width",(ikh-ikh_margin_left-ikh_border_difference-ikh_border_difference)+"px");
							}else{
								$(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").find(".ikh-post-item").css("width",(ikh-ikh_margin_left)+"px");
							}
							$(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").find(".ikh-post-item").css("height",($(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").height()-ikh_border_difference)+"px");
							$(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").find(".ikh-post-item").css("margin-left",(ikh_mrg_lft)+"px");	
							$(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").css("visibility","visible"); 
						}   
						
						 ikh_flg_loop = 1; 
						break;
					}  
				} 
				
				if(ikh_flg_loop==1){ 
					break;
				}
			} 
			
			//get max height of the item 
			var ikh_item_content_height_lt = [];
			var ikh_item_image_height_lt = [];
			for ( var ikh_j1=0; ikh_j1 < $(ikh_element).find(".ikh-post-item-box").length; ikh_j1++ ) {
				ikh_item_content_height_lt.push( $(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").find(".ikh-post-item").find(".ikh-content").height() );  
				if($(ikh_element).find(".ikh-post-item-box").find(".ikh-post-item").find(".ikh-image").length > 0 )
					ikh_item_image_height_lt.push( $(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").find(".ikh-post-item").find(".ikh-image").height() );  
			}  
			var  ikh_image_height1 = 0;   
			
			if( $(ikh_element).find(".ikh-post-item .ikh-image").css("float") == "left" || $(ikh_element).find(".ikh-post-item .ikh-image").css("display") == "none" ) {
				ikh_image_height1 = Math.max.apply(Math,ikh_item_content_height_lt) ;
			} else if( $(ikh_element).find(".ikh-post-item .ikh-content").css("position") == "absolute" && $(ikh_element).find(".ikh-post-item-box").find(".ikh-post-item").find(".ikh-image").length > 0) {
				if(Math.max.apply(Math,ikh_item_image_height_lt)>Math.max.apply(Math,ikh_item_content_height_lt))
					ikh_image_height1 = Math.max.apply(Math,ikh_item_image_height_lt);
				else
					ikh_image_height1 = Math.max.apply(Math,ikh_item_content_height_lt);
				
				ikh_image_height1 = Math.max.apply(Math,ikh_item_image_height_lt)-5;	
			} else {
				if($(ikh_element).find(".ikh-post-item-box").find(".ikh-post-item").find(".ikh-image").length > 0 ) {
					ikh_image_height1 = Math.max.apply(Math,ikh_item_image_height_lt) + Math.max.apply(Math,ikh_item_content_height_lt)  ;
				} else {
					ikh_image_height1 = ikh_image_height + Math.max.apply(Math,ikh_item_content_height_lt) ;
				} 
			}
			$(ikh_element).find(".ikh-post-item").css("height",(ikh_image_height1-ikh_border_difference)+"px");
			$(ikh_element).find(".ikh-post-item-box").css("height",ikh_image_height1+"px"); 
			 
		
			// set position of each items
			var ikh_flg_loop = 0; 
			for(var ikh = ikh_max_width; ikh >= ikh_min_width; ikh--) {
				for( var ikhw = 60; ikhw > 0; ikhw-- ) {
					var ikh_items_width = ikh * ikhw;  
					ikh_items_width = ikh_items_width-ikh_margin_left-ikh_border_difference;
					if( ikh_main_width >= ikh_items_width ) {
						var ikh_remaining_width = ikh_main_width-ikh_items_width;
						var ikh_prev = ikh;
						ikh = ((ikh_remaining_width/ikhw)+ikh); 
						if(ikh>(ikh_max_width+((((ikh_item_area_width + ikh_margin_left)/2)/2)))) { 
							ikhw=ikhw+1;
							ikh = ikh_prev;
							ikh_items_width = ikh * ikhw; 
							ikh_items_width = ikh_items_width-ikh_margin_left-ikh_border_difference;
							ikh_remaining_width = ikh_main_width-ikh_items_width;
							ikh = ((ikh_remaining_width/ikhw)+ikh);  
						}
						$(ikh_element).find(".ikh-post-item-box").css("height",ikh_image_height1+"px");  
						$(ikh_element).find(".ikh-post-item-box").css("position","absolute"); 
						var ikh_first_left = 0;
						var ikh_last_left = ikh_first_left;
						var ikh_num_lines = 0;
						for ( var ikh_j1=0; ikh_j1 < $(ikh_element).find(".ikh-post-item-box").length; ikh_j1++ ) {
							
							var ikh_mrg_lft = 0; 
							if( ikh_j1 == 0 ) { 
								rwapcp_ikh_set_element_postion(ikh_element,ikh_j1,ikh_first_left,0,ikh_config_elements);
								ikh_mrg_lft = 0;
							} else {
								if( (ikh_j1%ikhw) == 0 ) {
									ikh_last_left = ikh_first_left;
									ikh_mrg_lft = 0;
									ikh_num_lines++;
								} else { 
									ikh_last_left = ikh_last_left + ikh; 
									  ikh_mrg_lft = ikh_margin_left-ikh_border_difference;
								}
								
								if( ((ikh_j1-1)%(ikhw)) == 0 && ikhw>1 ) 
									ikh_last_left = ikh_last_left - ikh_margin_left-ikh_border_difference;
								rwapcp_ikh_set_element_postion(ikh_element,ikh_j1,ikh_last_left,(ikh_num_lines*(ikh_image_height1+ikh_margin_bottom)),ikh_config_elements);	
								 
							}	 
							   
						}  
						$(ikh_element).css("height",((ikh_num_lines+1)*(ikh_image_height1+ikh_margin_bottom))-ikh_margin_bottom+"px"); 
						ikh_flg_loop = 1; 
						break;
					}  
				} 
				
				if(ikh_flg_loop==1){ 
					break;
				}
			}	  
		
		
		
		}	// else width check		
		
		rwapcp_ikh_common_innerelement_load(ikh_element);  
	
	});
}	

function rwapcp_ikh_fixed_width_left(ikh_config_elements,root_element) {
	
	jQuery(document).ready(function($){
	
		var ikh_element = $(root_element); 
		var ikh_border_difference = ikh_config_elements["ikh_border_difference"];
		var ikh_margin_bottom = ikh_config_elements["ikh_margin_bottom"];
		var ikh_image_height = ikh_config_elements["ikh_image_height"];
		var ikh_margin_left = ikh_config_elements["ikh_margin_left"];
		var ikh_item_area_width = ikh_config_elements["ikh_item_area_width"]; 
		
		var ikh_main_width = parseInt($(ikh_element).width()); 
		var ikh_flg_loop = 0;  
		var ikh = ikh_item_area_width + ikh_margin_left - ikh_border_difference;
		var ikhw = parseInt(ikh_main_width/ikh); 
		if(ikh_main_width<ikh) {
			ikhw = 1;
			ikh = ikh_main_width+ ikh_margin_left - ikh_border_difference;
		}
		$(ikh_element).find(".ikh-post-item-box").css("height",ikh_image_height+"px");  
		$(ikh_element).find(".ikh-post-item-box").css("position","absolute"); 
		var ikh_first_left = 0;
		var ikh_last_left = ikh_first_left;
		var ikh_num_lines = 0;
		 
		 
		if(ikh_main_width<=ikh_item_area_width) {
		
				$(ikh_element).find(".ikh-post-item-box").removeAttr("style");
				$(ikh_element).find(".ikh-post-item").removeAttr("style");						
				$(ikh_element).find(".ikh-post-item-box").css("width","100% ");
				$(ikh_element).find(".ikh-post-item-box").css("margin-bottom",ikh_margin_bottom+"px ");
				$(ikh_element).find(".ikh-post-item-box ").css("visibility","visible");
				$(ikh_element).find(".ikh-post-item").css("width",(ikh_main_width-ikh_border_difference)+"px ");
				$(ikh_element).find(".ikh-post-item").css("height","auto");	
				$(ikh_element).find(".ik-post-load-more").removeAttr("style").css("position","relative");
				$(ikh_element).find(".rwapcp-simple-paging").removeAttr("style").css("position","relative");	 
				
		} else { 
		
			// set width of each items
			var ikh_num_lines = 0;
			for ( var ikh_j1=0; ikh_j1 < $(ikh_element).find(".ikh-post-item-box").length; ikh_j1++ ) {
				
				var ikh_mrg_lft = 0; 
				if( ikh_j1 == 0 ) {  
					ikh_mrg_lft = 0;
				} else {
					if( (ikh_j1%ikhw) == 0 ) {
						ikh_last_left = ikh_first_left;
						ikh_mrg_lft = 0;
						ikh_num_lines++;
					} else { 
						ikh_last_left = ikh_last_left + ikh; 
						ikh_mrg_lft = ikh_margin_left;
					}
					
					if( ((ikh_j1-1)%(ikhw)) == 0 && ikhw>1 ) 
						 ikh_last_left = ikh_last_left - ikh_margin_left; 
						 
				}	 
				  
				if( (ikh_j1%ikhw) == 0 && ikhw>1 ) {
					$(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").css("width",(ikh-ikh_margin_left)+"px");
				}else{
					$(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").css("width",(ikh)+"px");
				}  
				
				if( (ikh_j1%ikhw) == 0 && ikhw==1 ) {
					$(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").find(".ikh-post-item").css("width",(ikh-ikh_margin_left)+"px");
				}else{
					$(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").find(".ikh-post-item").css("width",(ikh-ikh_margin_left-ikh_border_difference)+"px");
				}
				
				$(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").find(".ikh-post-item").css("height",($(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").height()-ikh_border_difference)+"px");
				$(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").find(".ikh-post-item").css("margin-left",(ikh_mrg_lft)+"px");	
				$(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").css("visibility","visible");
			} 
			
			//get max height of the item 
			var ikh_item_content_height_lt = [];
			var ikh_item_image_height_lt = [];
			for ( var ikh_j1=0; ikh_j1 < $(ikh_element).find(".ikh-post-item-box").length; ikh_j1++ ) {
				ikh_item_content_height_lt.push( $(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").find(".ikh-post-item").find(".ikh-content").height() );  
				if($(ikh_element).find(".ikh-post-item-box").find(".ikh-post-item").find(".ikh-image").length > 0 )
					ikh_item_image_height_lt.push( $(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").find(".ikh-post-item").find(".ikh-image").height() );  
			}  
			var  ikh_image_height1 = 0;   
			
			if( $(ikh_element).find(".ikh-post-item .ikh-image").css("float") == "left" || $(ikh_element).find(".ikh-post-item .ikh-image").css("display") == "none" ) {
				ikh_image_height1 = Math.max.apply(Math,ikh_item_content_height_lt);
			} else if( $(ikh_element).find(".ikh-post-item .ikh-content").css("position") == "absolute" && $(ikh_element).find(".ikh-post-item-box").find(".ikh-post-item").find(".ikh-image").length > 0) {
				if(Math.max.apply(Math,ikh_item_image_height_lt)>Math.max.apply(Math,ikh_item_content_height_lt))
					ikh_image_height1 = Math.max.apply(Math,ikh_item_image_height_lt);
				else
					ikh_image_height1 = Math.max.apply(Math,ikh_item_content_height_lt);
					
				ikh_image_height1 = Math.max.apply(Math,ikh_item_image_height_lt)-5;	
			} else {
				if($(ikh_element).find(".ikh-post-item-box").find(".ikh-post-item").find(".ikh-image").length > 0 ) {
					ikh_image_height1 = Math.max.apply(Math,ikh_item_image_height_lt) + Math.max.apply(Math,ikh_item_content_height_lt);
				} else {
					ikh_image_height1 = ikh_image_height + Math.max.apply(Math,ikh_item_content_height_lt);
				} 
			}
			$(ikh_element).find(".ikh-post-item-box").find(".ikh-post-item").css("height",(ikh_image_height1-ikh_border_difference)+"px");
			$(ikh_element).find(".ikh-post-item-box").css("height",ikh_image_height1+"px"); 
			
			// set position of each items
			var ikh_last_left = 0;
			var ikh_num_lines= 0;
			for ( var ikh_j1=0; ikh_j1 < $(ikh_element).find(".ikh-post-item-box").length; ikh_j1++ ) {
				
				var ikh_mrg_lft = 0; 
				if( ikh_j1 == 0 ) { 
					rwapcp_ikh_set_element_postion(ikh_element,ikh_j1,ikh_first_left,0,ikh_config_elements);
					ikh_mrg_lft = 0;
				} else {
					if( (ikh_j1%ikhw) == 0 ) {
						ikh_last_left = ikh_first_left;
						ikh_mrg_lft = 0;
						ikh_num_lines++;
					} else { 
						ikh_last_left = ikh_last_left + ikh; 
						ikh_mrg_lft = ikh_margin_left;
					}
					
					if( ((ikh_j1-1)%(ikhw)) == 0 && ikhw>1 ) 
						 ikh_last_left = ikh_last_left - ikh_margin_left; 
						
					rwapcp_ikh_set_element_postion(ikh_element,ikh_j1,ikh_last_left,(ikh_num_lines*(ikh_image_height1+ikh_margin_bottom)),ikh_config_elements);	
					 
				}	 
			}  
			
			$(ikh_element).css("height",((ikh_num_lines+1)*(ikh_image_height1+ikh_margin_bottom))-ikh_margin_bottom+"px"); 
		
		} //else width check
		rwapcp_ikh_common_innerelement_load(ikh_element);  
	
	});
}

function rwapcp_ikh_fixed_width_center(ikh_config_elements, root_element) {
	
	jQuery(document).ready(function($){
		var ikh_element = $(root_element); 
		var ikh_border_difference = ikh_config_elements["ikh_border_difference"];
		var ikh_margin_bottom = ikh_config_elements["ikh_margin_bottom"];
		var ikh_image_height = ikh_config_elements["ikh_image_height"];
		var ikh_margin_left = ikh_config_elements["ikh_margin_left"];
		var ikh_item_area_width = ikh_config_elements["ikh_item_area_width"]; 
		 
		var ikh_main_width = parseInt($(ikh_element).width()); 
		var ikh_flg_loop = 0;  
		var ikh = ikh_item_area_width + ikh_margin_left;
		var ikhw = parseInt(ikh_main_width/ikh); 
		var ikh_org_margin_left = ikh_margin_left-ikh_border_difference;
		var ikh_flg_1 = 0;
		if( ikh_main_width < ikh ) {
			ikhw = 1;
			ikh = ikh_main_width ;
			ikh_flg_1 = 1;
		}
		var ikh_remaining_width = ikh_main_width - (ikh*ikhw);
		var ikh_remaining_width_left = (ikh_remaining_width/2); 
		if(( ikh_flg_1 == 1 )) {
			ikh_remaining_width_left = 0;
			ikh_org_margin_left = 0;
		}
		$(ikh_element).find(".ikh-post-item-box").css("height",ikh_image_height+"px");  
		$(ikh_element).find(".ikh-post-item-box").css("position","absolute"); 
		var ikh_first_left = 0;
		var ikh_last_left = ikh_first_left;
		var ikh_num_lines = 0;
		
		
		if(ikh_main_width<=ikh_item_area_width) {
				$(ikh_element).find(".ikh-post-item-box").removeAttr("style");
				$(ikh_element).find(".ikh-post-item").removeAttr("style");						
				$(ikh_element).find(".ikh-post-item-box").css("width","100% ");				
				$(ikh_element).find(".ikh-post-item-box").css("margin-bottom",ikh_margin_bottom+"px ");
				$(ikh_element).find(".ikh-post-item-box ").css("visibility","visible");
				$(ikh_element).find(".ikh-post-item").css("width",(ikh_main_width-ikh_border_difference)+"px ");
				$(ikh_element).find(".ikh-post-item").css("height","auto");								
				$(ikh_element).find(".ik-post-load-more").removeAttr("style").css("position","relative");
				$(ikh_element).find(".rwapcp-simple-paging").removeAttr("style").css("position","relative");	 
		} else {
		
		// set width and height of the items
		var ikh_num_lines = 0;
		var ikh_item_height_lt = [];
		for ( var ikh_j1=0; ikh_j1 < $(ikh_element).find(".ikh-post-item-box").length; ikh_j1++ ) {
			
			var ikh_mrg_lft = 0; 
			if( ikh_j1 == 0 ) { 
				ikh_mrg_lft = 0;
				ikh_last_left = ikh_first_left+ikh_remaining_width_left+((ikh_org_margin_left/2)/2);
			} else {
				if( (ikh_j1%ikhw) == 0 ) {
					ikh_last_left = ikh_first_left+ikh_remaining_width_left+((ikh_org_margin_left/2)/2);
					ikh_mrg_lft = 0;
					ikh_num_lines++;
				} else { 
					ikh_last_left = ikh_last_left + ikh ; 
					ikh_mrg_lft = ikh_org_margin_left;
				}
				
				if( ((ikh_j1-1)%(ikhw)) == 0 && ikhw>1 ) 
					 ikh_last_left = ikh_last_left - ikh_org_margin_left;  
			}	 
			  
			if( (ikh_j1%ikhw) == 0 && ikhw>1 ) {
				$(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").css("width",(ikh-ikh_org_margin_left)+"px");
			}else{
				$(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").css("width",(ikh)+"px");
			}  
			
			if( (ikh_j1%ikhw) == 0  && ikhw==1 ) {
				$(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").find(".ikh-post-item").css("width",(ikh-ikh_org_margin_left-ikh_border_difference)+"px");
			}else{
				$(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").find(".ikh-post-item").css("width",(ikh-ikh_org_margin_left-ikh_border_difference)+"px");
			}
			$(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").find(".ikh-post-item").css("height",($(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").height()-ikh_border_difference)+"px");
			$(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").find(".ikh-post-item").css("margin-left",(ikh_mrg_lft)+"px");	
			$(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").css("visibility","visible");
			
			ikh_item_height_lt.push( $(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").find(".ikh-post-item").find(".ikh-content").height() );  
		}
		
		//get max height of the item 
		var ikh_item_content_height_lt = [];
		var ikh_item_image_height_lt = [];
		for ( var ikh_j1=0; ikh_j1 < $(ikh_element).find(".ikh-post-item-box").length; ikh_j1++ ) {
			ikh_item_content_height_lt.push( $(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").find(".ikh-post-item").find(".ikh-content").height() );  
			if($(ikh_element).find(".ikh-post-item-box").find(".ikh-post-item").find(".ikh-image").length > 0 )
				ikh_item_image_height_lt.push( $(ikh_element).find(".ikh-post-item-box:eq("+ikh_j1+")").find(".ikh-post-item").find(".ikh-image").height() );  
		}  
		var  ikh_image_height1 = 0;   
		
		if( $(ikh_element).find(".ikh-post-item .ikh-image").css("float") == "left" || $(ikh_element).find(".ikh-post-item .ikh-image").css("display") == "none" ) {
			ikh_image_height1 = Math.max.apply(Math,ikh_item_content_height_lt);
		} else if( $(ikh_element).find(".ikh-post-item .ikh-content").css("position") == "absolute" && $(ikh_element).find(".ikh-post-item-box").find(".ikh-post-item").find(".ikh-image").length > 0) {
			if(Math.max.apply(Math,ikh_item_image_height_lt)>Math.max.apply(Math,ikh_item_content_height_lt))
				ikh_image_height1 = Math.max.apply(Math,ikh_item_image_height_lt);
			else
				ikh_image_height1 = Math.max.apply(Math,ikh_item_content_height_lt);
			
			ikh_image_height1 = Math.max.apply(Math,ikh_item_image_height_lt)-5;		
		} else {
			if($(ikh_element).find(".ikh-post-item-box").find(".ikh-post-item").find(".ikh-image").length > 0 ) {
				ikh_image_height1 = Math.max.apply(Math,ikh_item_image_height_lt) + Math.max.apply(Math,ikh_item_content_height_lt);
			} else {
				ikh_image_height1 = ikh_image_height + Math.max.apply(Math,ikh_item_content_height_lt);
			} 
		}
		$(ikh_element).find(".ikh-post-item-box").find(".ikh-post-item").css("height",(ikh_image_height1-ikh_border_difference)+"px");
		$(ikh_element).find(".ikh-post-item-box").css("height",ikh_image_height1+"px"); 
		 
		//set position of each items
		var ikh_last_left = 0;
		var ikh_num_lines= 0;
		for ( var ikh_j1=0; ikh_j1 < $(ikh_element).find(".ikh-post-item-box").length; ikh_j1++ ) {
			
			var ikh_mrg_lft = 0; 
			if( ikh_j1 == 0 ) { 
				rwapcp_ikh_set_element_postion(ikh_element,ikh_j1,(ikh_first_left+ikh_remaining_width_left+((ikh_org_margin_left/2)/2)),0,ikh_config_elements);
				ikh_mrg_lft = 0;
				ikh_last_left = ikh_first_left+ikh_remaining_width_left+((ikh_org_margin_left/2)/2);
			} else {
				if( (ikh_j1%ikhw) == 0 ) {
					ikh_last_left = ikh_first_left+ikh_remaining_width_left+((ikh_org_margin_left/2)/2);
					ikh_mrg_lft = 0;
					ikh_num_lines++;
				} else { 
					ikh_last_left = ikh_last_left + ikh ; 
					ikh_mrg_lft = ikh_org_margin_left;
				}
				
				if( ((ikh_j1-1)%(ikhw)) == 0 && ikhw>1 ) 
					 ikh_last_left = ikh_last_left - ikh_org_margin_left; 
					
				rwapcp_ikh_set_element_postion(ikh_element,ikh_j1,ikh_last_left,(ikh_num_lines*(ikh_image_height1+ikh_margin_bottom)),ikh_config_elements);	
				 
			}	 
			   
		}  
		
		 $(ikh_element).css("height",((ikh_num_lines+1)*(ikh_image_height1+ikh_margin_bottom))-ikh_margin_bottom+"px");
		
		} //else width check
		rwapcp_ikh_common_innerelement_load(ikh_element);  
	});	
} 

function rwapcp_ikh_common_innerelement_load(ikh_element){
	jQuery(document).ready(function($){
		// load more button height settings
		
		var main_final_height = ($(ikh_element).height()+2);
		var pagination_top = $(ikh_element).height();
		if($(ikh_element).find(".ik-post-category").length>0){
			main_final_height = main_final_height + ($(ikh_element).find(".ik-post-category").height()+30);
			pagination_top = pagination_top + ($(ikh_element).find(".ik-post-category").height()+30)
		} else {
			pagination_top = pagination_top + 10;
			main_final_height = main_final_height + 10;
		}
		if($(ikh_element).find(" .ik-post-load-more").length>0){
			main_final_height = main_final_height + ($(ikh_element).find(" .ik-post-load-more").height()+30);
			var left_bottom_pos = ($(ikh_element).find(" .ik-post-load-more").width()/2);	
			$(ikh_element).find(" .ik-post-load-more").css("display","none"); 			
			$(ikh_element).find(" .ik-post-load-more").css("top",pagination_top+"px").css("position","absolute");
			$(ikh_element).find(" .ik-post-load-more").css("left",(($(ikh_element).width()/2)-left_bottom_pos)+"px");
			$(ikh_element).css("display","block"); 
			$(ikh_element).find(" .item-posts-wrap").css("height",main_final_height+"px");
			$(ikh_element).css("height",main_final_height+"px");
			$(ikh_element).find(" .ik-post-load-more").css("position","absolute");
			$(ikh_element).find(" .ik-post-load-more").css("display","block");  
		} if($(ikh_element).find(" .rwapcp-simple-paging").length>0){
			main_final_height = main_final_height + ($(ikh_element).find(".rwapcp-simple-paging").height()+30);
			var left_bottom_pos = ($(ikh_element).find(" .rwapcp-simple-paging").width()/2); 
			$(ikh_element).find(" .rwapcp-simple-paging").css("display","none"); 
			$(ikh_element).find(" .rwapcp-simple-paging").css("top",pagination_top+"px").css("position","absolute");
			$(ikh_element).find(" .rwapcp-simple-paging").css("left",(($(ikh_element).width()/2)-left_bottom_pos)+"px");
			$(ikh_element).css("display","block"); 
			$(ikh_element).find(" .item-posts-wrap").css("height",main_final_height+"px");
			$(ikh_element).css("height",main_final_height+"px");
			$(ikh_element).find(" .rwapcp-simple-paging").css("position","absolute");
			$(ikh_element).find(" .rwapcp-simple-paging").css("display","block"); 
		} else {
			if( $(ikh_element).find(" .item-posts-wrap").find("div").length <= 0) {
				$(ikh_element).find(" .item-posts-wrap").css("height","0px");
				$(ikh_element).css("height","0px");
				$(ikh_element).css("display","none"); 
			} else {
				$(ikh_element).find(" .item-posts-wrap").css("height",(main_final_height)+"px");
				$(ikh_element).css("height",(main_final_height)+"px");
				$(ikh_element).css("display","block"); 
			}
		}
		
		var ikh_item_area_width =  parseInt($(ikh_element).find(".ikh_item_area_width").val());	 
		var ikh_main_width = parseInt($(ikh_element).width());      
		if(ikh_main_width<=ikh_item_area_width) {
			$(ikh_element).find(" .rwapcp-simple-paging").css("position","relative").removeAttr("style").show();
			$(ikh_element).find(" .ik-post-load-more").css("position","relative").removeAttr("style").show();	
		    $(ikh_element).find(" .rwapcp-simple-paging").css("position","relative");
			$(ikh_element).find(" .ik-post-load-more").css("position","relative");	
			$(ikh_element).find(" .item-posts-wrap").removeAttr("style");
			$(ikh_element).css("height","auto");	
		}
		
		$(ikh_element).find(".ikh-post-item-box").find(".ikh-post-item").show().css("visibility","visible");
		$(ikh_element).find(".ik-post-category").show();
		 
		$(ikh_element).find(".ikh-post-item-box .ikh-image img").each(function(){	 
			$(this).load(function(){  
				$(this).parent().css("visibility","visible"); 
				$(this).animate({"opacity":1});  
			});
		});  
		clearTimeout(ikh_tm_id2);
		 
		var ikh_tm_id2 = setTimeout(function(){  
			$(ikh_element).find(".ikh-post-item-box").find(".ikh-post-item").show().css("visibility","visible");
			$(ikh_element).find(".ikh-post-item-box .ikh-image img").each(function(){	 
				if($(this).css("opacity")==0 || $(this).css("opacity")=='0'){
					  $(this).parent().css("visibility","visible");
					 $(this).animate({"opacity":1}); 
				} 
			});  
			clearTimeout(ikh_tm_id2);  
		},50);
		
		var ikh_tm_id22 = setTimeout(function(){ 			
			$(ikh_element).find(".ikh-post-item-box .ikh-image img").each(function(){	 
				var img_src = $(this).attr("src");
				img_src = img_src+"?";
				img_src = img_src.split("?");
				$(this).attr("src",img_src[0]+"?s=29");  
			});   
			clearTimeout(ikh_tm_id22);  
		},2000); 
			
	});
} 

function rwapcp_ikh_set_element_postion(ikh_element,ikh_ele,ikh_left,ikh_top,ikh_config_elements_1){			 
	
		jQuery(document).ready(function($){ 
				
				if($(ikh_element).find(".ik-post-category").length>0){
					ikh_top = ikh_top + ($(ikh_element).find(".ik-post-category").height()+28);
				} else {
					ikh_top = ikh_top + 10;
				}
		
				if(ikh_config_elements_1["ikh_posts_loads_from"] == "top" ){
					$(ikh_element).find(".ikh-post-item-box:eq("+ikh_ele+")").css("top", "-"+(ikh_top+50)+"px"); 
					$(ikh_element).find(".ikh-post-item-box:eq("+ikh_ele+")").css("left", (ikh_left)+"px");
				} if(ikh_config_elements_1["ikh_posts_loads_from"] == "left" ){
					$(ikh_element).find(".ikh-post-item-box:eq("+ikh_ele+")").css("top", (ikh_top)+"px"); 
				} if(ikh_config_elements_1["ikh_posts_loads_from"] == "right" ){
					$(ikh_element).find(".ikh-post-item-box:eq("+ikh_ele+")").css("top", (ikh_top)+"px");
					$(ikh_element).find(".ikh-post-item-box:eq("+ikh_ele+")").css("right", "-"+(ikh_left+100)+"px");
				} if(ikh_config_elements_1["ikh_posts_loads_from"] == "bottom" ){
					$(ikh_element).find(".ikh-post-item-box:eq("+ikh_ele+")").css("left", (ikh_left)+"px");
					$(ikh_element).find(".ikh-post-item-box:eq("+ikh_ele+")").css("bottom", "-"+(ikh_top+100)+"px");
				} if(ikh_config_elements_1["ikh_posts_loads_from"] == "none" ){
					$(ikh_element).find(".ikh-post-item-box:eq("+ikh_ele+")").css("left", (ikh_left)+"px");
					$(ikh_element).find(".ikh-post-item-box:eq("+ikh_ele+")").css("top", (ikh_top)+"px");
				}
				
				$(ikh_element).find(".ikh-post-item-box:eq("+ikh_ele+")").animate({"opacity":1,"top":ikh_top+"px","left":ikh_left+"px"},function(){
					$(this).fadeIn();
				});	
				
				//$(window).scroll(($(".ikh-post-item-box").parent().offset().top + $(".ikh-post-item-box").parent().height()));
		});
} 
			
/************************************/
/********** NEW LAYOUT END ********/
/************************************/  

function rwapcp_cls_width_change(ob_width_change){		
	jQuery(document).ready(function($){
		if( ob_width_change.value == "static" ) {
			$(ob_width_change).parent().parent().parent().parent().parent().find(".rwapcp_cls_width_fixed").show();
			$(ob_width_change).parent().parent().parent().parent().parent().find(".rwapcp_cls_width_auto").hide();
		} else {
			$(ob_width_change).parent().parent().parent().parent().parent().find(".rwapcp_cls_width_auto").show();
			$(ob_width_change).parent().parent().parent().parent().parent().find(".rwapcp_cls_width_fixed").hide();
		}
	});	
}

function rwapcp_loadMorePosts(category_id,limit,elementId,total,request_obj){

	if(flg_v1==1) return;
	jQuery(document).ready(function($){ 
			var root_element = $("#"+elementId).parent();
			if($("#"+elementId).parent().parent().hasClass("lt-tab"))
				root_element = $("#"+elementId).parent().parent(); 
			
			var post_search_text = $(root_element).find(".item-posts").find(".ik-post-search-text").val();
			if((category_id==='undefined')) category_id = 0;
			if((post_search_text==='undefined')) post_search_text = ""; 
 			$(root_element).find(".item-posts").find(".ik-post-load-more").html("<div align='center'>"+$(".wp-load-icon").html()+"</div>");
			$(root_element).find(".item-posts").find(".wp-load-icon-li").find("img").css("visibility", "visible"); 
			flg_v1 = 1;
			
			request_obj.action = 'rwapcp_getMorePosts';
			request_obj.security = richproductaccordion.rwapcp_security;
			request_obj.category_id = category_id;
			request_obj.post_search_text = post_search_text; 
			request_obj.limit_start = limit; 
			request_obj.total = total;  
			
			$.ajax({
				url: richproductaccordion.rwapcp_ajax_url, 
				data: request_obj,
				success:function(data) {     
					rwapcp_printData(elementId,data,"loadmore");
				},error: function(errorThrown){ console.log(errorThrown);}
			});
	});
}
function rwapcp_fillPosts(elementId,category_id,request_obj,flg_pr){
	if(flg_v1==1) return;
 	jQuery(document).ready(function($){
			  
			if($("#"+elementId).hasClass('pn-active') && flg_pr==1){			  
				$("#"+elementId).removeClass("pn-active"); 
				$("#"+elementId).parent().find(".item-posts").animate({height:0},500,function(){
					$("#"+elementId).parent().find(".item-posts .item-posts-wrap").html("");
					$("#"+elementId).parent().find(".item-posts .item-posts-wrap").attr("style","width:100%;height:auto");
					$("#"+elementId).parent().find(".item-posts").attr("style","width:100%;display:none;height:auto"); 
				});			
				return;
			} else if( $("#"+elementId).parent().parent().parent().hasClass("rwapcp_allow_autoclose_accordion")  && flg_pr==1 ) {  
				   
				$("#"+elementId).parent().parent().parent().find(".pn-active").each(function(){
					 $(this).removeClass("pn-active");
					$(this).parent().find(".item-posts").animate({height:0},500,function(){
						 $(this).parent().find(".item-posts").slideUp(600);
						 $(this).parent().find(".item-posts .item-posts-wrap").html("");
						 $(this).parent().find(".item-posts .item-posts-wrap").attr("style","width:100%;height:auto");
						 $(this).parent().find(".item-posts").attr("style","width:100%;display:none;height:auto");
					 });		
				});
			}
			
			var root_element = $("#"+elementId).parent();
			if($("#"+elementId).parent().parent().hasClass("lt-tab"))
				root_element = $("#"+elementId).parent().parent();  
			 
			$("#"+elementId).addClass("pn-active");	
			$("#"+elementId).parent().find(".item-posts").slideDown(200);
			 
			if(flg_pr==2){
				$(root_element).find(".ik-search-button").html($(".wp-load-icon").html()); 
			}
			else{  
				$("#"+elementId).find(".ik-load-content,.ik-post-no-items").remove();
				$("#"+elementId).find(".ld-pst-item-text").html("<div class='ik-load-content'>"+$(".wp-load-icon").html()+"</div>");
			}	
			 
			var post_search_text = $(root_element).find(".item-posts").find(".ik-post-search-text").val();
			if((category_id==='undefined')) category_id = 0;
			if((post_search_text==='undefined')) post_search_text = "";
 			flg_v1 = 1;
			 
			request_obj.action = 'rwapcp_getPosts';
			request_obj.security = richproductaccordion.rwapcp_security;
			request_obj.category_id = category_id;
			request_obj.post_search_text = post_search_text; 
			
		 	$.ajax({
				url: richproductaccordion.rwapcp_ajax_url,
				security: richproductaccordion.rwapcp_security,
				data: request_obj,
				success:function(data) { 
					rwapcp_printData(elementId,data,"fillpost"); 
				},error: function(errorThrown){ console.log(errorThrown);}
			});   
	});		  
}

function rwapcp_printData( elementId, data, flg ) {

	jQuery(document).ready(function($){
		
	  	var root_element = $("#"+elementId).parent();
		if($("#"+elementId).parent().parent().hasClass("lt-tab"))
			root_element = $("#"+elementId).parent().parent(); 		

		var ipc = "";
		if($(root_element).find(".item-posts").find(".ik-post-category").length>0)
		 ipc =  $(root_element).find(".item-posts").find(".ik-post-category").html();
		
		if ($("#"+elementId).parent().parent().hasClass("simple_numeric_pagination") || $("#"+elementId).parent().parent().hasClass("next_and_previous_links")) {
			$(root_element).find(".item-posts .item-posts-wrap").html("");  
		}			
		  
		if(flg=="loadmore"){
			
			if ($("#"+elementId).parent().parent().hasClass("simple_numeric_pagination") || $("#"+elementId).parent().parent().hasClass("next_and_previous_links")) {			
				$(root_element).find(".item-posts").find(".ik-post-item").remove();
				$(root_element).find(".item-posts").find(".rwapcp-simple-paging").remove();
				$(root_element).find(".item-posts").find(".sp-cls-loader").remove();	
				if(ipc != "")	
					data = '<div class="ik-post-category">'+ipc+"</div>"+data;		
			} else {
				$(root_element).find(".item-posts").find(".wp-load-icon").remove();
				$(root_element).find(".item-posts").find(".clr").remove();
				$(root_element).find(".item-posts").find(".ik-post-load-more").remove(); 
			}			
			$(root_element).find(".item-posts .item-posts-wrap").append(data); 
			$(root_element).find(".item-posts").append("<div class='clr'></div>");
		}else{ 
			$("#"+elementId).find(".ik-load-content,.ik-post-no-items").remove();			 
			$(root_element).find(".item-posts .item-posts-wrap").html(data);  
		}
		
		rwapcp_reload_current_elements(elementId);
		 
		flg_v1 = 0;	
	});	  	
	
}

var flg_ms_hover = 0;
function rwapcp_pr_item_image_mousehover(ob_pii){ 
	if(flg_ms_hover == 1) return;
	jQuery(document).ready(function($){
		$(ob_pii).find(".ov-layer").show();  
		$(ob_pii).find(".ov-layer").css("visibility","visible"); 
		$(ob_pii).find(".ov-layer").css("top","40");  
		flg_ms_hover = 1;
		if($.trim($(ob_pii).find(".ov-layer").html())!="")
			$(ob_pii).find(".ov-layer").animate({opacity:0.9,top:0},0); 
		else
			$(ob_pii).find(".ov-layer").animate({opacity:0.5,top:0},0); 
	});
} 
function rwapcp_pr_item_image_mouseout(ob_pii){
	jQuery(document).ready(function($){ 
		$(ob_pii).find(".ov-layer").animate({opacity:0,top:40},0);
		flg_ms_hover = 0;
		$(ob_pii).find(".ov-layer").hide();
		$(ob_pii).find(".ov-layer").css("visibility","hidden");  
	});
}

function rwapcp_cat_tab_ms_out(ob_ms_eff){
	jQuery(document).ready(function($){ 
		$(ob_ms_eff).removeClass("pn-active-bg"); 	
	});
}
function rwapcp_cat_tab_ms_hover(ob_ms_eff){
	jQuery(document).ready(function($){ 
		$(ob_ms_eff).addClass("pn-active-bg"); 	
	});
} 

function rwapcp_init_accordion(){
	jQuery(document).ready(function($){ 
	
		if(typeof jQuery.fn.live === 'undefined' || !jQuery.isFunction(jQuery.fn.live)){
			jQuery.fn.extend({
				live:function(event,callback){
					if(this.selector){
						jQuery(document).on(event,this.selector,callback);
					}
				}
			});
		}
		
		$(".ik-post-search-text").live("keyup",function(e){
			if(e.keyCode==13){
				$(this).parent().parent().find(".ik-search-button").trigger("click");
			}
		}); 
		
		$(window).resize(function(){
			clearTimeout(this.id); 
			var ikh_tm_id = setTimeout(function(){ 
				rwapcp_init_elements();  
				clearTimeout(ikh_tm_id);
			},500);   
			
		});  
		rwapcp_init_elements();  
		
		setInterval(function(){  
			 $("#richproductaccordion .wea_content .pn-active").each(function(){  
				var attr_id = $(this).attr("id");
				var ikh_element = $(this).parent().find(".item-posts"); 
				if($(this).parent().parent().hasClass("lt-tab"))
					ikh_element = $(this).parent().parent().find(".item-posts");
				
				$(ikh_element).find(".ikh-post-item").each(function(){
					 if( $(this).height() <= 50 ){
						rwapcp_ikh_resize_elements(attr_id);   
					 }
				});  
			});
		},500);
		
	});	
}	

if ( window.addEventListener ) { 
	window.addEventListener( "load", rwapcp_init_accordion, false );
}
else {    
	if ( window.attachEvent ) { 
		  window.attachEvent( "onload", rwapcp_init_accordion );
	} else {
		 if ( window.onLoad ) {
		   window.onload = rwapcp_init_accordion;
		 }
	}	 
} 