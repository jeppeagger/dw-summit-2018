<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
  <xsl:output method="xml" omit-xml-declaration="yes" indent="yes"  encoding="utf-8" />
  <xsl:param name="html-content-type" />
  <xsl:template match="/NavigationTree">

    <xsl:if test="count(//Page) > 0">
      <ul>
        <xsl:if test="Settings/LayoutNavigationSettings/@cssclass!=''">
          <xsl:attribute name="class">
            <xsl:value-of select="Settings/LayoutNavigationSettings/@cssclass" disable-output-escaping="yes"/>
          </xsl:attribute>
        </xsl:if>
        <xsl:if test="Settings/LayoutNavigationSettings/@id!=''">
          <xsl:attribute name="id">
            <xsl:value-of select="Settings/LayoutNavigationSettings/@id" disable-output-escaping="yes"/>
          </xsl:attribute>
        </xsl:if>

        <xsl:apply-templates select="Page"></xsl:apply-templates>
      </ul>
    </xsl:if>

  </xsl:template>

  <xsl:template match="//Page">
    <xsl:if test="@Allowclick='True' and not(count(Page)) and @Sort>'1'">
      <li>
        <xsl:attribute name="class">
          <xsl:text disable-output-escaping="yes">menu-mobile__item dw-mod</xsl:text>
          <xsl:if test="@InPath='True' or @Active='True'"> menu__item--active </xsl:if>
        </xsl:attribute>
        <a>
          <xsl:attribute name="class">
            <xsl:text disable-output-escaping="yes">menu-mobile__link</xsl:text>
            <xsl:if test="@InPath='True' or @Active='True'"> menu-mobile__link--active </xsl:if>
            <xsl:text disable-output-escaping="yes"> dw-mod</xsl:text>
          </xsl:attribute>
          <xsl:attribute name="href">
            <xsl:value-of select="@FriendlyHref" disable-output-escaping="yes"/>
          </xsl:attribute>
          <xsl:value-of select="@MenuText" disable-output-escaping="yes"/>
        </a>
      </li>
    </xsl:if>
  </xsl:template>

</xsl:stylesheet>