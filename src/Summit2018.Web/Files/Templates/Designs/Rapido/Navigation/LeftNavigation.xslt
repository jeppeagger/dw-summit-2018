<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
  <xsl:output method="html" omit-xml-declaration="yes" indent="yes"  encoding="utf-8" />
  <xsl:param name="html-content-type" />
  <xsl:template match="/NavigationTree">
    <xsl:if test="Settings/LayoutNavigationSettings/@mode='ecom' and count(//Page[@InPath='True']/Page) > 0 or count(//Page) > 0">
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
        <xsl:choose>
          <xsl:when test="Settings/LayoutNavigationSettings/@mode='ecom'">
            <xsl:apply-templates select="Page[@InPath='True']/Page">
              <xsl:with-param name="depth" select="1"/>
            </xsl:apply-templates>
          </xsl:when>
          <xsl:otherwise>
            <xsl:apply-templates select="Page">
              <xsl:with-param name="depth" select="1"/>
            </xsl:apply-templates>
          </xsl:otherwise>
        </xsl:choose>
      </ul>
    </xsl:if>
  </xsl:template>

  <xsl:template match="//Page">
    <xsl:param name="depth"/>
    <li class="menu-left__item dw-mod">
      <a>
        <xsl:attribute name="class">
          <xsl:text disable-output-escaping="yes">menu-left__link dw-mod </xsl:text>
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
      <xsl:if test="count(Page) and @InPath='True' and /NavigationTree/Settings/LayoutNavigationSettings/@endlevel > @RelativeLevel">
        <ul class="menu-left menu-left--submenu dw-mod">
          <xsl:apply-templates select="Page">
            <xsl:with-param name="depth" select="$depth+1"/>
          </xsl:apply-templates>
        </ul>
      </xsl:if>
    </li>
  </xsl:template>

</xsl:stylesheet>