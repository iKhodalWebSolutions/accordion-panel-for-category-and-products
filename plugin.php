<?php 
/*
  Plugin Name: Woocommerce category wise product listing accordion tabs and filter by tabbed category plugin
  Description: An woocommerce accordion plugin of the categories and product
  Author: iKhodal Web Solution
  Plugin URI: https://www.ikhodal.com/category-and-product-accordion-panel
  Author URI: https://www.ikhodal.com
  Version: 2.1  
  Text Domain: richproductaccordion
*/ 
  
  
//////////////////////////////////////////////////////
// Defines the constants for use within the plugin. //
////////////////////////////////////////////////////// 
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly  
 
/**
*  Assets of the plugin
*/
$rwapcp_plugins_url = plugins_url( "/assets/", __FILE__ );

define( 'rwapcp_media', $rwapcp_plugins_url ); 

/**
*  Plugin DIR
*/
$rwapcp_plugin_dir = plugin_basename(dirname(__FILE__));

define( 'rwapcp_plugin_dir', $rwapcp_plugin_dir ); 
 
///////////////////////////////////////////////////////
// Include files for widget and shortcode management //
///////////////////////////////////////////////////////

/**
 * Include abstract class for common methods
 */
require_once 'include/abstract.php';
 
/**
 * Register custom post type for shortcode
 */ 
require_once 'include/shortcode.php';

/**
 * Admin panel widget configuration
 */ 
require_once 'include/admin.php';

/**
 * Load Rich Accordion Shortcode and Plugin on frontent pages
 */
require_once 'include/richproductaccordion.php'; 

/**
 * Clean data on activation / deactivation
 */
require_once 'include/activation_deactivation.php';  
 