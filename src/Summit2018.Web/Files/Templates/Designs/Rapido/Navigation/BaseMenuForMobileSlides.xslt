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
          <xsl:text disable-output-escaping="yes">menu-mobile__item dw-mod</xsl:text>
          <xsl:if test="@Active='True'"> menu-mobile__item--active</xsl:if>
          <xsl:if test="count(Page) and /NavigationTree/Settings/LayoutNavigationSettings/@endlevel > @RelativeLevel">
            <xsl:text disable-output-escaping="yes"> is-submenu</xsl:text>
          </xsl:if>
        </xsl:attribute>

        <xsl:if test="not(count(Page) and /NavigationTree/Settings/LayoutNavigationSettings/@endlevel > @RelativeLevel)">
          <a>
            <xsl:attribute name="class">
              <xsl:text disable-output-escaping="yes">menu-mobile__link dw-mod </xsl:text>
              <xsl:if test="@Active='True'"> menu-mobile__link--active</xsl:if>
            </xsl:attribute>
            <xsl:attribute name="href">
              <xsl:value-of select="@FriendlyHref" disable-output-escaping="yes"/>
            </xsl:attribute>
            <xsl:value-of select="@MenuText" disable-output-escaping="yes"/>
          </a>
        </xsl:if>
        <xsl:if test="count(Page) and /NavigationTree/Settings/LayoutNavigationSettings/@endlevel > @RelativeLevel">
          <xsl:variable name="listid" select="concat('MobileMenuCheck_', generate-id(.))" />
          <input id="{$listid}" type="checkbox" class="expand-trigger">
            <xsl:choose>
              <xsl:when test="@InPath='True'">
                <xsl:attribute name="checked">checked</xsl:attribute>
              </xsl:when>
            </xsl:choose>
          </input>
          <div class="menu-mobile__link__wrap">
            <label for="{$listid}">
              <xsl:attribute name="class">
                <xsl:text disable-output-escaping="yes">menu-mobile__link dw-mod </xsl:text>
                <xsl:if test="@Active='True'"> menu-mobile__link--active</xsl:if>
              </xsl:attribute>
              <xsl:value-of select="@MenuText" disable-output-escaping="yes"/>
            </label>
            <label for="{$listid}" class="menu-mobile__trigger menu-mobile__trigger">
              <text></text>
            </label>
          </div>
          <xsl:if test="@RelativeLevel>=/NavigationTree/Settings/LayoutNavigationSettings/@ecomStartLevel">
            <ul class="menu-mobile menu-mobile__submenu">
              <li class="menu-mobile__item dw-mod">
                <div class="menu-mobile__link__wrap">
                  <label for="{$listid}" class="menu-mobile__trigger menu-mobile__trigger--back">
                    <text></text>
                  </label>
                  <label for="{$listid}" class="menu-mobile__link dw-mod">Back</label>
                </div>
              </li>
              <li class="menu-mobile__item dw-mod">
                <span class="menu-mobile__header dw-mod">
                  <xsl:value-of select="@MenuText" disable-output-escaping="yes"/>
                </span>
              </li>
              <xsl:if test="@Active!='True'">
                <li class="menu-mobile__item dw-mod">
                  <a>
                    <xsl:attribute name="class">
                      <xsl:text disable-output-escaping="yes">menu-mobile__link dw-mod </xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="href">
                      <xsl:value-of select="@FriendlyHref" disable-output-escaping="yes"/>
                    </xsl:attribute>
                    Go to
                    <xsl:value-of select="@MenuText" disable-output-escaping="yes"/>
                  </a>
                </li>
              </xsl:if>
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