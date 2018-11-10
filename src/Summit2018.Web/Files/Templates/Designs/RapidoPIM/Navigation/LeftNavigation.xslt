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

        <xsl:apply-templates select="Page[@InPath='True']/Page">
          <xsl:with-param name="depth" select="1"/>
        </xsl:apply-templates>
      </ul>
    </xsl:if>

  </xsl:template>

  <xsl:template match="//Page">
    <xsl:param name="depth"/>
    <li>
      <xsl:attribute name="class">
        <xsl:text disable-output-escaping="yes">menu-left__item dw-mod </xsl:text>
        <xsl:if test="@AbsoluteLevel='@startLevel'">
          <xsl:text disable-output-escaping="yes"> dw-navbar-button</xsl:text>
        </xsl:if>
        <xsl:if test="@Active='True'"> menu-left__item--active </xsl:if>
        <xsl:value-of select="/NavigationTree/Settings/LayoutNavigationSettings/@endlevel > @RelativeLevel"/>
        <xsl:if test="count(Page) and /NavigationTree/Settings/LayoutNavigationSettings/@endlevel > @RelativeLevel">
          <xsl:text disable-output-escaping="yes"> is-submenu</xsl:text>
          <xsl:if test="@InPath='False'"> menu-left__item--closed </xsl:if>
          <xsl:if test="@InPath='True'"> menu-left__item--open </xsl:if>
        </xsl:if>
      </xsl:attribute>
      <a>
        <xsl:attribute name="class">
          <xsl:text disable-output-escaping="yes">menu-left__link dw-mod </xsl:text>
          menu-left__link--level-<xsl:value-of select="@AbsoluteLevel"></xsl:value-of>
          <xsl:if test="@Active='True'"> menu-left__link--active </xsl:if>
          <xsl:if test="count(Page) and /NavigationTree/Settings/LayoutNavigationSettings/@endlevel > @RelativeLevel">
            <xsl:if test="@InPath='False'"> menu-left__link--closed </xsl:if>
            <xsl:if test="@InPath='True'"> menu-left__link--open </xsl:if>
          </xsl:if>
        </xsl:attribute>
        <xsl:attribute name="href">
          <xsl:value-of select="@FriendlyHref" disable-output-escaping="yes"/>
        </xsl:attribute>
        <xsl:value-of select="@MenuText" disable-output-escaping="yes"/>
      </a>

      <xsl:if test="count(Page)">
        <ul class="menu-left menu-left__submenu">
          <xsl:apply-templates select="Page">
            <xsl:with-param name="depth" select="$depth+1"/>
          </xsl:apply-templates>
        </ul>
      </xsl:if>
    </li>
  </xsl:template>

</xsl:stylesheet>