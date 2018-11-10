<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
  
  <xsl:output method="xml" omit-xml-declaration="yes" indent="yes"  encoding="utf-8" />

  <xsl:template match="/">
    <xsl:apply-templates select="/NavigationTree" mode="html" />
    <xsl:apply-templates select="/NavigationTree" mode="js" />
  </xsl:template>
  
  <xsl:template match="/NavigationTree" mode="html">
    <xsl:if test="count(//Page[@InPath='True']) &gt; 0">
      <ul>
        <xsl:attribute name="class">
          <xsl:text disable-output-escaping="yes">breadcrumb dw-mod</xsl:text>
        </xsl:attribute>
        <xsl:if test="Settings/LayoutNavigationAttributes/@id!=''">
          <xsl:attribute name="id">
            <xsl:value-of select="Settings/LayoutNavigationAttributes/@id" disable-output-escaping="yes"/>
          </xsl:attribute>
        </xsl:if>
        <xsl:apply-templates select="//Page[@InPath='True']" mode="html">
          <xsl:with-param name="depth" select="1"/>
        </xsl:apply-templates>
      </ul>
    </xsl:if>
  </xsl:template>

  <xsl:template match="//Page[@InPath='True']" mode="html">
    <xsl:param name="depth"/>
    <li>
      <xsl:attribute name="class">
        <xsl:text disable-output-escaping="yes">breadcrumb__item dw-mod</xsl:text>
      </xsl:attribute>      
      <a>
        <xsl:attribute name="href">
          <xsl:value-of select="@FriendlyHref" disable-output-escaping="yes"/>
        </xsl:attribute>
        <xsl:value-of select="@MenuText" disable-output-escaping="yes"/>
      </a>
    </li>
    <!--@Snippet(breadcrumb)-->
  </xsl:template>
  
  <xsl:template match="/NavigationTree" mode="js">
    <xsl:if test="count(//Page) &gt; 0">
      <script>
        <xsl:attribute name="type">
          <xsl:text disable-output-escaping="yes">application/ld+json</xsl:text>
        </xsl:attribute>
        {
          "@context": "http://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            <xsl:apply-templates select="//Page[@InPath='True']" mode="js">
            </xsl:apply-templates>
          ]
        }
      </script>
    </xsl:if>
  </xsl:template>

  <xsl:template match="//Page[@InPath='True']" mode="js">
    <xsl:param name="website" select="concat(/NavigationTree/Settings/GlobalTags/Global.Request.Scheme/text(), '://', /NavigationTree/Settings/GlobalTags/Global.Request.Host/text())"></xsl:param>
    <xsl:if test="position() > 1">
      ,
    </xsl:if>
    {
      "@type": "ListItem",
      "position": <xsl:value-of select="position()"/>,
      "item": {
        "@id": "<xsl:value-of select="concat($website, @FriendlyHref)" disable-output-escaping="yes"/>",
        "name": "<xsl:value-of select="@MenuText" disable-output-escaping="yes"/>"
      }
    }
  </xsl:template>

</xsl:stylesheet>