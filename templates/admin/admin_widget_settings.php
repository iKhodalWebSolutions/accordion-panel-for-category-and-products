<?php if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly  ?> 
<div class="in-tabs-content-widget">
	<?php echo $this->loadConfigFields( $this->_config, $instance, "widget" );  ?>
	<input type="hidden" name="<?php echo $this->get_field_name( 'vcode' ); ?>" id="<?php echo $this->get_field_id( 'vcode' ); ?>" value="<?php echo $instance["vcode"]; ?>" /><br />
</div>	