<?php
namespace Grav\Plugin;

use Grav\Common\Plugin;

class MarkdownAttributesPlugin extends Plugin
{
    public $features = [
        'markdown' => true
    ];

    public function onPageContentProcessed($event)
    {
        $page = $event['page'];
        $content = $page->getRawContent();

        // Improved regex for definition list terms: Term{.class #id}
        $content = preg_replace_callback(
            '/^([^\s:].+?)\s*\{(.+?)\}\s*$/um',
            function($matches) {
                $term = trim($matches[1]);
                $attrs = trim($matches[2]);
                $attributes = $this->parseAttrs($attrs);

                return '<dt ' . $attributes . '>' . htmlspecialchars($term, ENT_QUOTES, 'UTF-8') . '</dt>';
            },
            $content
        );

        $page->setRawContent($content);
    }

    private function parseAttrs($str)
    {
        $attrs = [];

        // Classes .class1 .class2
        if (preg_match_all('/\.([a-zA-Z0-9_-]+)/u', $str, $m)) {
            $attrs[] = 'class="' . implode(' ', $m[1]) . '"';
        }

        // ID #my-id
        if (preg_match('/#([a-zA-Z0-9_-]+)/u', $str, $m)) {
            $attrs[] = 'id="' . $m[1] . '"';
        }

        // Other attributes (data-xxx="value" etc.)
        if (preg_match_all('/([a-zA-Z0-9_-]+)=["\']?([^"\']+)["\']?/u', $str, $m)) {
            foreach ($m[1] as $i => $key) {
                $value = htmlspecialchars($m[2][$i], ENT_QUOTES, 'UTF-8');
                $attrs[] = $key . '="' . $value . '"';
            }
        }

        return implode(' ', $attrs);
    }
}
