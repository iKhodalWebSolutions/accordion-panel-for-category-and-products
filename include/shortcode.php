<?php 
/** 
 * Register custom post type to manage shortcode
 */
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly   
if ( ! class_exists( 'categoryrichproductaccordionShortcode_Admin' ) ) {
	class categoryrichproductaccordionShortcode_Admin extends categoryrichproductaccordionLib {
	
		public $_shortcode_config = array();
		 
		/**
		 * constructor method.
		 *
		 * Register post type for accordion panel for category and posts shortcode
		 * 
		 * @access    public
		 * @since     1.0
		 *
		 * @return    void
		 */
		public function __construct() {
			
			parent::__construct();
			
	       /**
		    * Register hooks to manage custom post type for accordion panel for category and posts
		    */
			add_action( 'init', array( &$this, 'rwapcp_registerPostType' ) );   
			add_action( 'add_meta_boxes', array( &$this, 'add_richproductaccordion_metaboxes' ) );
			add_action( 'save_post', array(&$this, 'wp_save_richproductaccordion_meta' ), 1, 2 ); 
			add_action( 'admin_enqueue_scripts', array( $this, 'rwapcp_admin_enqueue' ) ); 
			
		   /* Register hooks for displaying shortcode column. */ 
			if( isset( $_REQUEST["post_type"] ) && !empty( $_REQUEST["post_type"] ) && trim($_REQUEST["post_type"]) == "rwapcp_accordion" ) {
				add_action( "manage_posts_custom_column", array( $this, 'richproductaccordionShortcodeColumns' ), 10, 2 );
				add_filter( 'manage_posts_columns', array( $this, 'rwapcp_shortcodeNewColumn' ) );
			}
			
			add_action( 'wp_ajax_rwapcp_getCategoriesOnTypes',array( &$this, 'rwapcp_getCategoriesOnTypes' ) ); 
			add_action( 'wp_ajax_nopriv_rwapcp_getCategoriesOnTypes', array( &$this, 'rwapcp_getCategoriesOnTypes' ) );
			add_action( 'wp_ajax_rwapcp_getCategoriesRadioOnTypes',array( &$this, 'rwapcp_getCategoriesRadioOnTypes' ) ); 
			add_action( 'wp_ajax_nopriv_rwapcp_getCategoriesRadioOnTypes', array( &$this, 'rwapcp_getCategoriesRadioOnTypes' ) ); 
		 
		}   
	 
		
 	   /**
		* Register and load JS/CSS for admin widget configuration 
		*
		* @access  private
		* @since   1.0
		*
		* @return  bool|void It returns false if not valid page or display HTML for JS/CSS
		*/  
		public function rwapcp_admin_enqueue() {
		 
			if ( ! $this->validate_page() )
				return FALSE;
			
			wp_enqueue_style( 'wp-color-picker' );
			wp_enqueue_script( 'wp-color-picker' );
			wp_enqueue_style( 'admin-richproductaccordion.css', rwapcp_media."css/admin-richproductaccordion.css" );
			wp_enqueue_script( 'admin-richproductaccordion.js', rwapcp_media."js/admin-richproductaccordion.js" ); 
			
		}		
		 
	   /**
		* Add meta boxes to display shortcode
		*
		* @access  private
		* @since   1.0
		*
		* @return  void
		*/ 
		public function add_richproductaccordion_metaboxes() {
			
			/**
			 * Add custom fields for shortcode settings
		     */
			add_meta_box( 'wp_richproductaccordion_fields', __( 'Rich Accordion Shortcode and Plugin', 'richproductaccordion' ),
				array( &$this, 'wp_richproductaccordion_fields' ), 'rwapcp_accordion', 'normal', 'high' );
			
			/**
			 * Display shortcode of accordion panel for category and posts
		     */
			add_meta_box( 'wp_richproductaccordion_shortcode', __( 'Shortcode', 'richproductaccordion' ),
				array( &$this, 'shortcode_meta_box' ), 'rwapcp_accordion', 'side' );	
		
		}  
		
	   /**
		* Validate widget or shortcode post type page
		*
		* @access  private
		* @since   1.0
		*
		* @return  bool It returns true if page is post.php or widget otherwise returns false
		*/ 
		private function validate_page() {
 
			if ( ( isset( $_GET['post_type'] )  && $_GET['post_type'] == 'rwapcp_accordion' ) || strpos($_SERVER["REQUEST_URI"],"widgets.php") > 0  || strpos($_SERVER["REQUEST_URI"],"post.php" ) > 0 || strpos($_SERVER["REQUEST_URI"], "richproductaccordion_settings" ) > 0  )
				return TRUE;
		
		} 			
 
	   /**
		* Display richproductaccordion block configuration fields
		*
		* @access  private
		* @since   1.0
		*
		* @return  void Returns HTML for configuration fields 
		*/  
		public function wp_richproductaccordion_fields() { 
			
			global $post; 
			 
			foreach( $this->_config as $kw => $kw_val ) {
				$this->_shortcode_config[$kw] = get_post_meta( $post->ID, $kw, true ); 
			}
			  
			foreach ( $this->_shortcode_config as $sc_key => $sc_val ) {
				if( trim( $sc_val ) == "" )
					unset( $this->_shortcode_config[ $sc_key ] );
				else {
					if(!is_array($sc_val) && trim($sc_val) != "" ) 
						$this->_shortcode_config[ $sc_key ] = htmlspecialchars( $sc_val, ENT_QUOTES );
					else 
						$this->_shortcode_config[ $sc_key ] = $sc_val;
				}	
			}
			
			foreach( $this->_config as $kw => $kw_val ) {
				if( !is_array($this->_shortcode_config[$kw]) && trim($this->_shortcode_config[$kw]) == "" ) {
					$this->_shortcode_config[$kw] = $this->_config[$kw]["default"];
				} 
			}
			
			$this->_shortcode_config["vcode"] = get_post_meta( $post->ID, 'vcode', true );   
			 
			
			//$this->_shortcode_config = wp_parse_args( $this->_shortcode_config, $this->_config );
			require( $this->getcategoryPostsAccordionTemplate( "admin/admin_shortcode_post_type.php" ) );
			 
		}
		
	   /**
		* Display shortcode in edit mode
		*
		* @access  private
		* @since   1.0
		*
		* @param   object  $post Set of configuration data.
		* @return  void	   Displays HTML of shortcode
		*/
		public function shortcode_meta_box( $post ) {

			$richproductaccordion_id = $post->ID;

			if ( get_post_status( $richproductaccordion_id ) !== 'publish' ) {

				echo '<p>'.__( 'Please make the publish status to get the shortcode', 'richproductaccordion' ).'</p>';

				return;

			}

			$richproductaccordion_title = get_the_title( $richproductaccordion_id );

			$shortcode = sprintf( "[%s id='%s']", 'richproductaccordion', $richproductaccordion_id );
			
			echo "<p class='tpp-code'>".$shortcode."</p>";
		}
				  
	   /**
		* Save accordion panel for category and posts shortcode fields
		*
		* @access  private
		* @since   1.0 
		*
		* @param   int    	$post_id post id
		* @param   object   $post    post data object
		* @return  void
		*/ 
		function wp_save_richproductaccordion_meta( $post_id, $post ) {
			
			  /**if( !isset($_POST['richproductaccordion_nonce']) ) {
				return $post->ID;
			}
	
		 
			* Verify _nonce from request
			
			if( !wp_verify_nonce( $_POST['richproductaccordion_nonce'], plugin_basename(__FILE__) ) ) {
				return $post->ID;
			} */
			
		   /**
			* Check current user permission to edit post
			*/
			if(!current_user_can( 'edit_post', $post->ID ))
				return $post->ID; 
			 
		   /**
			* sanitize text fields 
			*/
			$richproductaccordion_meta = array(); 
			
			foreach( $this->_config as $kw => $kw_val ) { 
				$_save_value =  $_POST["nm_".$kw];
				if($kw_val["type"]=="boolean"){
					$_save_value = $_POST["nm_".$kw][0];
				}
				if( $kw_val["type"]=="checkbox" && count($_POST["nm_".$kw]) > 0 ) {
					$_save_value = implode( ",", $_POST["nm_".$kw] );
				}
				$richproductaccordion_meta[$kw] =  sanitize_text_field( $_save_value );
			}     
			 
			foreach ( $richproductaccordion_meta as $key => $value ) {
			
			   if( $post->post_type == 'revision' ) return;
				$value = implode( ',', (array)$value );
				
				if( trim($value) == "Array" || is_array($value) )
					$value = "";
					
			   /**
				* Add or update posted data 
				*/
				if( get_post_meta( $post->ID, $key, FALSE ) ) { 
					update_post_meta( $post->ID, $key, $value );
				} else { 
					add_post_meta( $post->ID, $key, $value );
				}
				
				//if( ! $value ) delete_post_meta( $post->ID, $key );
			
			}	
			 
		}
		
			 
	   /**
		* Register post type for accordion panel for category and posts shortcode
		*
		* @access  private
		* @since   1.0
		*
		* @return  void
		*/  
		function rwapcp_registerPostType() { 
			
		   /**
			* Post type and menu labels 
			*/
			$labels = array(
				'name' => __('Woocommerce Product Accordion Shortcode', 'richproductaccordion' ),
				'singular_name' => __( 'Woocommerce Product Accordion Shortcode', 'richproductaccordion' ),
				'add_new' => __( 'Add New Shortcode', 'richproductaccordion' ),
				'add_new_item' => __( 'Add New Shortcode', 'richproductaccordion' ),
				'edit_item' => __( 'Edit', 'richproductaccordion'  ),
				'new_item' => __( 'New', 'richproductaccordion'  ),
				'all_items' => __( 'All', 'richproductaccordion'  ),
				'view_item' => __( 'View', 'richproductaccordion'  ),
				'search_items' => __( 'Search', 'richproductaccordion'  ),
				'not_found' =>  __( 'No item found', 'richproductaccordion'  ),
				'not_found_in_trash' => __( 'No item found in Trash', 'richproductaccordion'  ),
				'parent_item_colon' => '',
				'menu_name' => __( 'WCAP', 'richproductaccordion'  ) 
			);
			
		   /**
			* Rich Accordion Shortcode and Plugin post type registration options
			*/
			$args = array(
				'labels' => $labels,
				'public' => false,
				'publicly_queryable' => false,
				'show_ui' => true,
				'show_in_menu' => true,
				'query_var' => false,
				'rewrite' => false,
				'capability_type' => 'post',
				'menu_icon' => 'dashicons-list-view',
				'has_archive' => false,
				'hierarchical' => false,
				'menu_position' => null,
				'supports' => array( 'title' )
			);
			
		   /**
			* Register new post type
			*/
			 register_post_type( 'rwapcp_accordion', $args );
				
			 
	
				

		}
		
	   /**
		* Display shortcode column in accordion panel for category and posts list
		*
		* @access  private
		* @since   1.0
		*
		* @param   string  $column  Column name
		* @param   int     $post_id Post ID
		* @return  void	   Display shortcode in column	
		*/
		public function richproductaccordionShortcodeColumns( $column, $post_id ) { 
		
			if( $column == "shortcode" ) {
				 echo sprintf( "[%s id='%s']", 'richproductaccordion', $post_id ); 
			}  
		
		}
		
	   /**
		* Register shortcode column
		*
		* @access  private
		* @since   1.0
		*
		* @param   array  $columns  Column list 
		* @return  array  Returns column list
		*/
		public function rwapcp_shortcodeNewColumn( $columns ) {
			
			$_edit_column_list = array();	
			$_i = 0;
			
			foreach( $columns as $__key => $__value) {
					
					if($_i==2){
						$_edit_column_list['shortcode'] = __( 'Shortcode', 'richproductaccordion' );
					}
					$_edit_column_list[$__key] = $__value;
					
					$_i++;
			}
			
			return $_edit_column_list;
		
		}
		
	} 

}

new categoryrichproductaccordionShortcode_Admin();
 
?>