<?php
namespace Grav\Plugin\Shortcodes;

use Thunder\Shortcode\Shortcode\ShortcodeInterface;

class WrapperShortcode extends Shortcode
{
    public function init()
    {
        $this->shortcode->getHandlers()->add('wrapper', function(ShortcodeInterface $sc) {

            $tag   = $sc->getParameter('tag') ?: 'section';
            $class = $sc->getParameter('class');

            // Защита от XSS
            $tag = preg_replace('/[^a-z0-9-]+/i', '', $tag); // только безопасные теги

            $output = '<' . $tag;
            if ($class) {
                $output .= ' class="' . htmlspecialchars($class, ENT_QUOTES) . '"';
            }
            $output .= '>';

            // Контент уже обработан Markdown (shortcode работает после markdown)
            $output .= $sc->getContent();

            $output .= '</' . $tag . '>';

            return $output;
        });
    }
}
