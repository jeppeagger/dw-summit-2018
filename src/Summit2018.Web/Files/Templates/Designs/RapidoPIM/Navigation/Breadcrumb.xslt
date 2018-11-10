<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >

  <xsl:output method="xml" omit-xml-declaration="yes" indent="yes"  encoding="utf-8" />
  <xsl:param name="html-content-type" />
  <xsl:template match="/NavigationTree">

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
        <xsl:apply-templates select="//Page[@InPath='True']">
          <xsl:with-param name="depth" select="1"/>
        </xsl:apply-templates>

      </ul>
    </xsl:if>

  </xsl:template>

  <xsl:template match="//Page[@InPath='True']">
    <xsl:param name="depth"/>
    <li>
      <xsl:attribute name="class">
        <xsl:text disable-output-escaping="yes">breadcrumb__item</xsl:text>
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

</xsl:stylesheet>