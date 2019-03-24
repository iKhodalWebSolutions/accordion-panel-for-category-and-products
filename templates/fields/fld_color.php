<?php if ( ! defined( 'ABSPATH' ) ) exit;  ?> 

<?php if( $type == "widget" ) { ?>
	<tr class="color-field-tr">
		<td class="tp-label">
			<p> 
				<label for="<?php echo $this->get_field_id( $key ); ?>">
				<?php echo $fields[$key]["field_title"]; ?>:</label> 
			</p> 
		</td>  
		<td>  
			<p class="cls-clr-fld"> 
				<input class="rwapcp-color-field <?php echo esc_attr($fields[$key]["class"]); ?>" id="<?php echo $this->get_field_id( $key ); ?>" name="<?php echo $this->get_field_name( $key ); ?>" type="text" value="<?php echo $default_val; ?>"   />
			</p>
		</td>
	</tr>
<?php } else if( $type == "shortcode" ) { ?>	
	<tr class="color-field-tr">
		<td class="tp-label">
			<p> <label for="id_rwapcp_<?php echo esc_attr($key); ?>"><?php echo $fields[$key]["field_title"]; ?>:</label> </p>
			
		</td>
		<td>	
			  <div class="cls-row-item"> 
				<div class="cls-row-item-field">
					<p class="cls-clr-fld"> 
						<input type="text" id="id_rwapcp_<?php echo esc_attr($key); ?>" name="nm_<?php echo esc_attr($key); ?>" class="rwapcp_field rwapcp-color-field <?php echo esc_attr($fields[$key]["class"]); ?> color-picker-hex wp-color-picker is_required_<?php echo esc_attr($fields[$key]["is_required"]); ?>" value="<?php echo $default_val; ?>" />					
					 </p>
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