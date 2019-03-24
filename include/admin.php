<?php 
/** 
 * Admin panel widget configuration
 */
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly   
if ( ! class_exists( 'categoryrichproductaccordionWidget_Admin' ) ) { 
	class categoryrichproductaccordionWidget_Admin extends categoryrichproductaccordionLib {    
 
	   /**
		* Update the widget settings.
		* 
		* @access  private
		* @since   1.0
		*
		* @param   array  $new_instance  Set of POST form values
		* @param   array  $old_instance  Set of old form values
		* @return  array Sanitize form data 
		*/ 
		function update( $new_instance, $old_instance ) { 
		 
			foreach( $new_instance as $_key => $_value ) {
				if(is_array($new_instance[$_key]))
					$new_instance[$_key] = sanitize_text_field( implode(",",$new_instance[$_key]) );
				else		
					$new_instance[$_key] = sanitize_text_field( $new_instance[$_key] );  
			}
			
			return $new_instance;
		
		} 
 
	   /**
		* Displays the widget settings controls on the widget panel.  
		*
		* @access  private
		* @since   1.0
		*
		* @param   array  $instance  Set of form values
		* @return  void
		*/
		function form( $instance ) {  
		
			//$instance = wp_parse_args( $instance, $this->_config );   
		 
			// Filter values
			foreach( $instance as $_key => $_value ) {
				$instance[$_key]  = htmlspecialchars( $instance[$_key], ENT_QUOTES ); 
			}  	
		 
			require( $this->getcategoryPostsAccordionTemplate( 'admin/admin_widget_settings.php' ) );
		
		}

 
	   /**
		* Show the list panel
		*
		* @access  private
		* @since   1.0
		*
		* @param   array  $args  Set of configuration values
		* @param   array  $instance  Set of configuration values
		* @return  void	  Displays widget html
		*/
		function widget( $args, $instance ) { 
		
			// Filter values
			foreach( $instance as $_key => $_value ) {
				$instance[$_key] = htmlspecialchars( $instance[$_key], ENT_QUOTES ); 
			}  
			
			$this->_config = $instance;  
			$this->_config["vcode"] = $vcode =  "uid_".md5(time().md5(json_encode($this->_config)).$this->getUCode());
			/**
			 * Load template according to admin settings
			 */
		   
  		    echo $args['before_widget'];
			ob_start();			
			require( $this->getcategoryPostsAccordionTemplate( "fronted/front_template.php" ) );	
			echo ob_get_clean(); 	
			echo $args['after_widget']; 
		}
		
	}

}

/** 
 * Admin panel license configuration
 */
if ( ! class_exists( 'categoryrichproductaccordionLicenseConfig_Admin' ) ) {
	
	class categoryrichproductaccordionLicenseConfig_Admin extends categoryrichproductaccordionLib {
	
		/**
		 * constructor method.
		 *
		 * Register config menu and manage received data.
		 * 
		 * @access    public
		 * @since     1.0
		 *
		 * @return    void
		 */
		public function __construct() {
			 
			add_action( 'admin_init', array( $this,'richproductaccordion_manage_license' ) ); 
			add_action( 'admin_menu', array( $this,'rwapcp_add_plugin_admin_menu' )  );  	
			$this->init_settings();	 
		}		
		
		/**
		 * Activate or deactivate plugin using license key.
		 * 
		 * @access    public
		 * @since     1.0
		 *
		 * @return    void
		 */
		public function richproductaccordion_manage_license() {
			 $this->_config = $this->_plugin_settings  ;
			if( isset( $_POST['btnAct'] ) && trim($_POST['btnAct']) != "" &&  isset( $_GET["page"] ) && trim( $_GET["page"] ) == "richproductaccordion_settings" ){
			
				if( ! check_admin_referer( 'richproductaccordion_nonce', 'richproductaccordion_nonce' ) ) 	
					return; 
				
				$act_key = trim( $_POST['richproductaccordion_license_key'] ); 
				
				if( $act_key == "" ) {
					
					wp_redirect(site_url()."/wp-admin/edit.php?post_type=rwapcp_accordion&page=richproductaccordion_settings&st=11");
					die();
					
				}
				
				$api_params = array( 
					'action'=> 'activate_license', 
					'license' 	=> $act_key, 
					'item_name' => 'wp_richproductaccordion', 
					'url'       => home_url()
				);
				
				$response = wp_remote_get( add_query_arg( $api_params, $this->_config["richproductaccordion_license_url"]["license_url"] ), array( 'timeout' => 15, 'sslverify' => false ) );
				
				if ( is_wp_error( $response ) )
					wp_redirect( site_url()."/wp-admin/edit.php?post_type=rwapcp_accordion&page=richproductaccordion_settings&st=10" );
					 
				$license_data = json_decode( wp_remote_retrieve_body( $response ) );
				 
				update_option( 'richproductaccordion_license_status', $license_data->license_status );
				update_option( 'richproductaccordion_license_key', $license_data->license_key );
				update_option( 'richproductaccordion_license_reff', $license_data->license_reff );				
				 
				wp_redirect( site_url()."/wp-admin/edit.php?post_type=rwapcp_accordion&page=richproductaccordion_settings&st=".$license_data->st );
				die();				 
				
			}  
			if( isset( $_POST['btnDeact'] ) && trim($_POST['btnDeact']) != ""  &&  isset( $_GET["page"] ) && trim( $_GET["page"] ) == "richproductaccordion_settings" ) {
				
				if( ! check_admin_referer( 'richproductaccordion_nonce', 'richproductaccordion_nonce' ) ) 	
					return; 
				
				$license = trim( get_option( 'richproductaccordion_license_key' ) );
				  
				$api_params = array( 
					'action'=> 'deactivate_license', 
					'license' 	=> $license, 
					'item_name' => 'wp_richproductaccordion', 
					'url'       => home_url()
				);
				
				$response = wp_remote_get( add_query_arg( $api_params, $this->_config["richproductaccordion_license_url"]["license_url"] ), array( 'timeout' => 15, 'sslverify' => false ) );
				if ( is_wp_error( $response ) )
					wp_redirect(site_url()."/wp-admin/edit.php?post_type=rwapcp_accordion&page=richproductaccordion_settings&st=10");
				
				$license_data = json_decode( wp_remote_retrieve_body( $response ) );
				
				delete_option( 'richproductaccordion_license_status' );
				delete_option( 'richproductaccordion_license_key' );
				delete_option( 'richproductaccordion_license_reff' );
				 
				wp_redirect(site_url()."/wp-admin/edit.php?post_type=rwapcp_accordion&page=richproductaccordion_settings&st=".$license_data->st);
				die();	
			}
			
		}


		/**
		 * View fields form to activate or deactivate plugin using license key and display the activation status of plugin.
		 * 
		 * @access    public
		 * @since     1.0
		 *
		 * @return    void
		 */		
		public function rwapcp_display_plugin_settings_admin_page() {
			
			$license 	= get_option( 'richproductaccordion_license_key' );
			$status 	= get_option( 'richproductaccordion_license_status' );
			
			$_message = "";
			if( isset( $_REQUEST["st"] ) && trim( $_REQUEST["st"] ) != "" ) { 
			
			
			
				$_st = trim($_REQUEST["st"]);
				if( $_st == '1' ) {
					$_message = __( 'License key has been activated.', 'richproductaccordion');
						
				} else if( $_st == '2' ) {
					$_message = __( 'Already plugin activated. Please deactivate from all of your sites before activating it.', 'richproductaccordion');	
						
				} else if( $_st == '3' ) {
					$_message = __( 'Your site url is not registered from ikhodal.com or invalid license key, Please add your site url and get license key from ikhodal.com account if you have already purchased Rich Accordion Shortcode and Plugin plugin for wordpress.', 'richproductaccordion');	
						
				} else if( $_st == '4' ) {
					$_message = __( 'License key has been deactivated.', 'richproductaccordion');
						
				} else if( $_st == '5' ) {
					$_message = __( "Invalid license key. Please get valid licence key from ikhodal.com account. If you have already purchased 'Rich Accordion Shortcode and Plugin' plugin for wordpress.", 'richproductaccordion');
						
				} else if( $_st == '10' ) {
					$_message = __( 'Please try again after some time.', 'richproductaccordion');
						
				} else if( $_st == '11' ) {
					$_message = __( 'Please enter valid license key.', 'richproductaccordion');
						
				}  
				
			}
			
			?> 
				<div  class="wrap">
					 
					<h2 class="hndle ui-sortable-handle"><span><?php echo esc_html( get_admin_page_title() ); ?></span></h2> 
					
					<p><?php _e( "Activate/Deactivate 'Rich Accordion Shortcode and Plugin' plugin using provided license key.", 'richproductaccordion' ); ?></p>
					
					<?php
						if( $_message != "" ) {
							?>
								<div class=" notice <?php echo (($_st==1)?"updated":"error"); ?> ">
									<p><?php echo $_message; ?></p>
								</div>
							<?php
						}
					?>	
					 
					<form method="post" action="<?php echo site_url(); ?>/wp-admin/options-general.php?page=richproductaccordion_settings"> 
						
						<table style="width:100%" id="wp_richproductaccordion_fields" class="richproductaccordion-admin postbox">
							<tbody>
								<?php if(!( $status !== false && $status == 'valid' )){ ?>
								<tr valign="top">	
									<td  class="tp-label" align="right" valign="top">
										<p><?php _e( 'License Key', 'richproductaccordion' ); ?></p>
									</td>
									<td>
										<p><input id="richproductaccordion_license_key" name="richproductaccordion_license_key" type="text" class="regular-text" value="<?php  echo $license; ?>" />
										<br /> <i><?php _e('Please enter valid license key.', 'richproductaccordion'); ?></i></p>
									</td>
								</tr> 
								<?php } ?>
								<tr valign="top">	
									<td  class="tp-label" align="right" valign="top">
										<p><?php _e('Current License Status', 'richproductaccordion'); ?></p>
									</td>
									<td>
										<p><strong><?php echo ( !( $status !== false && $status == 'valid' )?__( 'Deactivated', 'richproductaccordion' ) : __( 'Activated', 'richproductaccordion' ) ); ?></strong></p> 
									</td>
								</tr> 
								<tr valign="top">	
									<td><p>&nbsp;</p></td>
									<td>
										<p><?php wp_nonce_field( 'richproductaccordion_nonce', 'richproductaccordion_nonce' ); ?> 
										<?php if(!( $status !== false && $status == 'valid' )){ ?>
										<input type="submit" name="btnAct" id="btnAct" class="button button-primary" value="<?php _e( 'Activate', 'richproductaccordion' ); ?>" />&nbsp;
										<?php } else { ?>
										<input type="submit" name="btnDeact" id="btnDeact" class="button button-primary" value="<?php _e( 'Deactivate' , 'richproductaccordion' ); ?>" />
										<?php } ?></p>
									</td>
								</tr>
							</tbody>
						</table>	
						
					</form>
				</div> 
			
			<?php 
		}
		
		/**
		 * Register menu on left sidebar in admin panel.
		 * 
		 * @access    public
		 * @since     1.0
		 *
		 * @return    void
		 */	
		public function rwapcp_add_plugin_admin_menu() {
		
			add_submenu_page('edit.php?post_type=rwapcp_accordion', __( 'License Key', 'richproductaccordion'), __( 'License Key', 'richproductaccordion'), 'manage_options', 'richproductaccordion_settings',	array( $this, 'rwapcp_display_plugin_settings_admin_page' )); 			
		 
		 
		}		
		
	}
}

new categoryrichproductaccordionLicenseConfig_Admin();

add_action( 'widgets_init',  'initrichcategoryproducttab'   ); 
function initrichcategoryproducttab() {
	register_widget( 'categoryrichproductaccordionWidget_Admin' );
}
