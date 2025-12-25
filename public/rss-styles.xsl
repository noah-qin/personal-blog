<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/"
                xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> RSS Feed</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
            line-height: 1.5;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            background: #fafafa;
          }
          @media (prefers-color-scheme: dark) {
            body {
              background: #0f0f11;
              color: #e4e4e7;
            }
            .header-box {
              background: #18181b !important;
              border-color: #27272a !important;
            }
            a {
              color: #818cf8 !important;
            }
            .item {
              background: #18181b !important;
              border-color: #27272a !important;
            }
            p {
              color: #a1a1aa !important;
            }
          }
          .header-box {
            background: #fff;
            padding: 2rem;
            border-radius: 12px;
            border: 1px solid #e4e4e7;
            margin-bottom: 2rem;
            text-align: center;
          }
          h1 {
            margin: 0 0 0.5rem 0;
            font-size: 1.8rem;
          }
          p {
            color: #71717a;
            margin: 0;
          }
          .subscribe-info {
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid #e4e4e7;
            font-size: 0.9rem;
          }
          .item {
            background: #fff;
            padding: 1.5rem;
            border-radius: 8px;
            border: 1px solid #e4e4e7;
            margin-bottom: 1rem;
            transition: transform 0.2s ease;
          }
          .item:hover {
            transform: translateY(-2px);
          }
          .item h2 {
            margin: 0 0 0.5rem 0;
            font-size: 1.4rem;
          }
          .item h2 a {
            text-decoration: none;
            color: inherit;
          }
          .item h2 a:hover {
            text-decoration: underline;
          }
          .meta {
            font-size: 0.85rem;
            color: #71717a;
            margin-bottom: 1rem;
            font-family: monospace;
          }
          a {
            color: #4f46e5;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="header-box">
          <h1><xsl:value-of select="/rss/channel/title"/></h1>
          <p><xsl:value-of select="/rss/channel/description"/></p>
          <div class="subscribe-info">
            <p><strong>This is an RSS feed.</strong> Subscribe by copying the URL into your news reader app.</p>
          </div>
        </div>

        <xsl:for-each select="/rss/channel/item">
          <div class="item">
            <h2>
              <a href="{link}" target="_blank">
                <xsl:value-of select="title"/>
              </a>
            </h2>
            <div class="meta">
              <xsl:value-of select="pubDate"/>
            </div>
            <p><xsl:value-of select="description"/></p>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
