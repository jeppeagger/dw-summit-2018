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

        <xsl:apply-templates select="Page">
          <xsl:with-param name="depth" select="1"/>
        </xsl:apply-templates>
      </ul>
    </xsl:if>

  </xsl:template>

  <xsl:template match="//Page">
    <xsl:param name="depth"/>
    <xsl:if test="@RelativeLevel>/NavigationTree/Settings/LayoutNavigationSettings/@startLevel">
      <li>
        <xsl:attribute name="class">
          <xsl:text disable-output-escaping="yes">menu__item dw-mod</xsl:text>
          <xsl:if test="@RelativeLevel=/NavigationTree/Settings/LayoutNavigationSettings/@ecomStartLevel">
            <xsl:text disable-output-escaping="yes"> menu__item--horizontal</xsl:text>
            <xsl:text disable-output-escaping="yes"> menu__item--top-level</xsl:text>
            <xsl:text disable-output-escaping="yes"> dw-navbar-button</xsl:text>
            <xsl:if test="count(Page) and /NavigationTree/Settings/LayoutNavigationSettings/@endlevel > @RelativeLevel">
              <xsl:text disable-output-escaping="yes"> is-dropdown</xsl:text>
            </xsl:if>
          </xsl:if>
          <xsl:if test="@RelativeLevel>/NavigationTree/Settings/LayoutNavigationSettings/@ecomStartLevel">
            <xsl:if test="count(Page) and /NavigationTree/Settings/LayoutNavigationSettings/@endlevel > @RelativeLevel">
              <xsl:text disable-output-escaping="yes"> is-dropleft</xsl:text>
            </xsl:if>
            <xsl:text disable-output-escaping="yes"> menu__item--fixed-width</xsl:text>
          </xsl:if>
          <xsl:if test="@InPath='True' or @Active='True'"> menu__item--active </xsl:if>
          <xsl:if test="@Allowclick!='True'"> menu__item--disabled</xsl:if>
        </xsl:attribute>
        <xsl:if test="@Allowclick='True'">
          <a>
            <xsl:attribute name="class">
              <xsl:if test="@RelativeLevel=/NavigationTree/Settings/LayoutNavigationSettings/@ecomStartLevel">
                <xsl:text disable-output-escaping="yes">menu__link</xsl:text>
                <xsl:if test="@InPath='True' or @Active='True'"> menu__link--active </xsl:if>
              </xsl:if>
              <xsl:if test="@RelativeLevel>/NavigationTree/Settings/LayoutNavigationSettings/@ecomStartLevel">
                <xsl:text disable-output-escaping="yes"> menu-dropdown__link</xsl:text>
                <xsl:if test="@InPath='True' or @Active='True'"> menu-dropdown__link--active </xsl:if>
              </xsl:if>
              <xsl:text disable-output-escaping="yes"> dw-mod</xsl:text>
            </xsl:attribute>
            <xsl:attribute name="href">
              <xsl:value-of select="@FriendlyHref" disable-output-escaping="yes"/>
            </xsl:attribute>
            <xsl:value-of select="@MenuText" disable-output-escaping="yes"/>
          </a>
        </xsl:if>
        <xsl:if test="@Allowclick!='True'">
          <span>
            <xsl:attribute name="class">
              <xsl:if test="@RelativeLevel=/NavigationTree/Settings/LayoutNavigationSettings/@ecomStartLevel">
                <xsl:text disable-output-escaping="yes">menu__link</xsl:text>
                <xsl:if test="@InPath='True' or @Active='True'"> menu__link--active </xsl:if>
              </xsl:if>
              <xsl:if test="@RelativeLevel>/NavigationTree/Settings/LayoutNavigationSettings/@ecomStartLevel">
                <xsl:text disable-output-escaping="yes"> menu-dropdown__link</xsl:text>
                <xsl:if test="@InPath='True' or @Active='True'"> menu-dropdown__link--active </xsl:if>
              </xsl:if>
              <xsl:text disable-output-escaping="yes"> dw-mod</xsl:text>
            </xsl:attribute>
            <xsl:value-of select="@MenuText" disable-output-escaping="yes"/>
          </span>
        </xsl:if>
        <xsl:if test="count(Page) and /NavigationTree/Settings/LayoutNavigationSettings/@endlevel > @RelativeLevel">
          <xsl:if test="@RelativeLevel=/NavigationTree/Settings/LayoutNavigationSettings/@ecomStartLevel">
            <ul class="menu menu--dropdown dw-mod">
              <xsl:apply-templates select="Page">
                <xsl:with-param name="depth" select="$depth+1"/>
              </xsl:apply-templates>
            </ul>
          </xsl:if>
          <xsl:if test="@RelativeLevel>/NavigationTree/Settings/LayoutNavigationSettings/@ecomStartLevel">
            <ul class="menu menu--dropleft dw-mod">
              <xsl:apply-templates select="Page">
                <xsl:with-param name="depth" select="$depth+1"/>
              </xsl:apply-templates>
            </ul>
          </xsl:if>
        </xsl:if>
      </li>
    </xsl:if>
    <xsl:if test="@RelativeLevel=/NavigationTree/Settings/LayoutNavigationSettings/@startLevel">
      <xsl:apply-templates select="Page">
        <xsl:with-param name="depth" select="$depth+1"/>
      </xsl:apply-templates>
    </xsl:if>
  </xsl:template>

</xsl:stylesheet>