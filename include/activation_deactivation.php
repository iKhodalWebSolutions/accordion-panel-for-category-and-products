<?php

/**
 * Clean data on activation / deactivation
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly  
 
register_activation_hook( __FILE__, 'richproductaccordion_activation');

function richproductaccordion_activation() {

	if( ! current_user_can ( 'activate_plugins' ) ) {
		return;
	} 
	add_option( 'richproductaccordion_license_status', 'invalid' );
	add_option( 'richproductaccordion_license_key', '' ); 

}

register_uninstall_hook( __FILE__, 'richproductaccordion_uninstall');

function richproductaccordion_uninstall() {

	delete_option( 'richproductaccordion_license_status' );
	delete_option( 'richproductaccordion_license_key' ); 
	
}