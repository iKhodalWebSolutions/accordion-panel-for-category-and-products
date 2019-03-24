<?php if ( ! defined( 'ABSPATH' ) ) exit;  ?>

<?php if( $type == "widget" ) { ?>
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
				
					<div class="cls-row-item-field-checkbox-list fld_checkbox_<?php echo esc_attr($key); ?>">
						<?php   
							$default_val = explode( ",", $default_val ); 
							foreach( $fields[$key]["options"] as $kw => $value ) {
								
								$_selected = "";						
								if( in_array( $kw, $default_val ) ) {	
									$_selected = 'checked="true"';
								}				
							
								?>
								<p>
									<input  onchange="<?php echo esc_attr($fields[$key]["onchange"]); ?>"  class="rwapcp_field_checkbox is_required_<?php echo esc_attr($fields[$key]["is_required"]); ?>" <?php echo $_selected; ?>  name="<?php echo  esc_attr( $this->get_field_name( $key )); ?>[]"  id="<?php echo  esc_attr($this->get_field_id( $key )); ?>_<?php echo  esc_attr($kw); ?>"  value="<?php echo $kw; ?>" type="checkbox">
									<label for="<?php echo  esc_attr($this->get_field_id( $key )); ?>_<?php echo  esc_attr($kw); ?>"><?php echo htmlspecialchars( $value, ENT_QUOTES ); ?></label>
								</p>
								<?php
							}   
						?> 
					</div> 
					<input type="hidden" class="chk-field-name-<?php echo esc_attr( $key ); ?>" data-value="<?php echo  esc_attr( $this->get_field_name( $key )); ?>" /> 
				</div>
			</div> 
		</td>
	</tr>
<?php } else if( $type == "shortcode" ) { ?>	
	<tr>
		<td class="tp-label"  valign="top">	
			<p> <label for="id_rwapcp_<?php echo esc_attr($key); ?>"><?php echo $fields[$key]["field_title"]; ?>:</label></p>			
		</td>
		<td>
			<div class="cls-row-item">
				<div class="cls-row-item-field">
					<div class="cls-row-item-field-checkbox-list fld_checkbox_<?php echo esc_attr($key); ?>">
						<?php     
						    $default_val = explode( ",", $default_val ); 
							foreach( $fields[$key]["options"] as $kw => $value ) {
								
								$_selected = "";				 
								if( in_array( $kw, $default_val ) ) {		
									$_selected = 'checked="true"';
								}				
							
								?>
								<p>
									<input  onchange="<?php echo esc_attr($fields[$key]["onchange"]); ?>"  class="rwapcp_field_checkbox is_required_<?php echo esc_attr($fields[$key]["is_required"]); ?>" <?php echo $_selected; ?>  name="nm_<?php echo esc_attr($key); ?>[]"  id="id_rwapcp_<?php echo $kw; ?>"  value="<?php echo $kw; ?>" type="checkbox">
									<label for="id_rwapcp_<?php echo $kw; ?>"><?php echo htmlspecialchars( $value, ENT_QUOTES ); ?></label>
								</p>
								<?php
							}   
						?> 
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