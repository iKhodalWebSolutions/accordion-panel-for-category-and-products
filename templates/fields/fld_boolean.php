<?php if ( ! defined( 'ABSPATH' ) ) exit;  ?> 

<?php 
 if( $type == "widget" ) { ?>

	<tr>
		<td class="tp-label">
			<p> 
				<label for="<?php echo $this->get_field_id( $key ); ?>">
				<?php echo $fields[$key]["field_title"]; ?>:</label> 
			</p> 
		</td>  
		<td>   
			<div class="cls-row-item">							
				<div class="cls-row-item-field">  
					<div class="cls-bool-field cls-bool-field-ins-<?php echo $default_val; ?>" data_attr="<?php echo $default_val; ?>" onclick="richproductaccordion_changeboolvalue(this)">
							<div class="cls-bool-field-ins" >
								 <div class="cls-row-item-rdo">
									<?php  
										foreach( $fields[$key]["options"] as $kw => $value ) {
										
											$_selected = "";
											if( $kw == $default_val ) {
												$_selected = "checked";
											}
											?> 
											<div class="cls-row-sub-item"> 
												<input <?php echo esc_attr($_selected); ?>  type="radio" id="<?php echo $this->get_field_id( $key ); ?>_<?php echo esc_attr($key.'_'.$kw); ?>" name="<?php echo $this->get_field_name( $key ); ?>[]" class="rwapcp_field rwapcp_field_boolean is_required_<?php echo esc_attr($fields[$key]["is_required"]); ?>" value="<?php echo $kw; ?>" /> <label for="<?php echo $this->get_field_id( $key ); ?>_<?php echo esc_attr($key.'_'.$kw); ?>"><?php echo $value; ?></label>
											</div>	
											<?php 		 
										} 				
									?>
									</div>
							  </div>
					 </div>	  
				</div>
			</div>   
		</td>
	</tr>
	
<?php } else if( $type == "shortcode" ) { ?>	

<tr>
	<td class="tp-label"  valign="top">	
		<p> <label for="id_rwapcp_<?php echo esc_attr($key); ?>"><?php echo $fields[$key]["field_title"]; ?>:</label> </p>
	</td>
	<td>  
		 <div class="cls-row-item">							
			 <div class="cls-row-item-field"> 
				<div class="cls-bool-field cls-bool-field-ins-<?php echo $default_val; ?>" data_attr="<?php echo $default_val; ?>" onclick="richproductaccordion_changeboolvalue(this)">
						<div class="cls-bool-field-ins" >
							 <div class="cls-row-item-rdo">
								<?php  
									foreach( $fields[$key]["options"] as $kw => $value ) {
									
										$_selected = "";
										if( $kw == $default_val ) {
											$_selected = "checked";
										}
										?> 
										<div class="cls-row-sub-item"> 
											<input <?php echo esc_attr($_selected); ?>  type="radio" id="id_rwapcp_<?php echo esc_attr($key.'_'.$kw); ?>" name="nm_<?php echo esc_attr($key); ?>[]" class="rwapcp_field rwapcp_field_boolean is_required_<?php echo esc_attr($fields[$key]["is_required"]); ?>" value="<?php echo $kw; ?>" /> <label for="id_rwapcp_<?php echo esc_attr($key.'_'.$kw); ?>"><?php echo $value; ?></label>
										</div>	
										<?php 		 
									} 				
								?>
							 </div>   
					  </div> 
				</div>  
			</div> 
			<div>
				<?php 
					if(isset($fields[$key]["description"])) 
						echo $fields[$key]["description"];
				?>		
			</div>
		</div>  
	</td>
</tr>

<?php } ?>