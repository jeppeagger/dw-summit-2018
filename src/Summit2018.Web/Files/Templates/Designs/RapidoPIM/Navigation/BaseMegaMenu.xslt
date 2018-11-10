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
          <xsl:with-param name="type" select="'list'"/>
        </xsl:apply-templates>
      </ul>
    </xsl:if>

  </xsl:template>

  <xsl:template match="//Page">
    <xsl:param name="depth"/>
    <xsl:param name="type"/>

    <xsl:choose>
      <xsl:when test="$type = 'list'">
        <xsl:if test="@Allowclick='True'">
          <li>
            <xsl:attribute name="class">
              <xsl:text disable-output-escaping="yes">menu__item menu__item--mega dw-mod</xsl:text>
              <xsl:if test="@RelativeLevel='1'">
                <xsl:text disable-output-escaping="yes"> menu__item--horizontal</xsl:text>
                <xsl:text disable-output-escaping="yes"> menu__item--top-level</xsl:text>
                <xsl:text disable-output-escaping="yes"> dw-navbar-button</xsl:text>
                <xsl:if test="count(Page) and /NavigationTree/Settings/LayoutNavigationSettings/@endlevel > @RelativeLevel">
                  <xsl:text disable-output-escaping="yes"> is-mega</xsl:text>
                </xsl:if>
              </xsl:if>
              <xsl:if test="@InPath='True' or @Active='True'"> menu__item--active </xsl:if>
            </xsl:attribute>
            <a>
              <xsl:attribute name="class">
                <xsl:if test="@RelativeLevel='1'">
                  <xsl:text disable-output-escaping="yes">menu__link dw-mod</xsl:text>
                  <xsl:if test="@InPath='True' or @Active='True'"> menu__link--active </xsl:if>
                </xsl:if>
                <xsl:if test="@RelativeLevel>'1'">
                  <xsl:text disable-output-escaping="yes"> menu-dropdown__link dw-mod</xsl:text>
                  <xsl:if test="@InPath='True' or @Active='True'"> menu-dropdown__link--active </xsl:if>
                </xsl:if>
              </xsl:attribute>
              <xsl:attribute name="href">
                <xsl:value-of select="@FriendlyHref" disable-output-escaping="yes"/>
              </xsl:attribute>
              <xsl:value-of select="@MenuText" disable-output-escaping="yes"/>
            </a>
            <xsl:if test="count(Page) and /NavigationTree/Settings/LayoutNavigationSettings/@endlevel > @RelativeLevel">
              <xsl:if test="@RelativeLevel='1'">
                <div class="menu mega-menu dw-mod">
                  <div class="grid">
                    <xsl:if test="/NavigationTree/Settings/LayoutNavigationSettings/@promotionImage!=''">
                      <div class="grid__col-9 grid__col--bleed">
                        <div class="grid">
                          <xsl:apply-templates select="Page">
                            <xsl:with-param name="depth" select="$depth+1"/>
                            <xsl:with-param name="type" select="'grid'"/>
                          </xsl:apply-templates>
                        </div>
                      </div>
                      <div class="grid__col-3">
                        <a>
                          <xsl:attribute name="href">
                            <xsl:value-of select="/NavigationTree/Settings/LayoutNavigationSettings/@promotionLink" disable-output-escaping="yes"/>
                          </xsl:attribute>
                          <img>
                            <xsl:attribute name="src">
                              <xsl:value-of select="/NavigationTree/Settings/LayoutNavigationSettings/@promotionImage" disable-output-escaping="yes"/>
                            </xsl:attribute>
                          </img>
                        </a>
                      </div>
                    </xsl:if>
                    <xsl:if test="/NavigationTree/Settings/LayoutNavigationSettings/@promotionImage=''">
                      <xsl:apply-templates select="Page">
                        <xsl:with-param name="depth" select="$depth+1"/>
                        <xsl:with-param name="type" select="'grid'"/>
                      </xsl:apply-templates>
                    </xsl:if>
                  </div>
                </div>
              </xsl:if>
            </xsl:if>
          </li>
        </xsl:if>
      </xsl:when>

      <xsl:when test="$type = 'grid'">
        <div>
        <xsl:attribute name="class">
          <xsl:if test="/NavigationTree/Settings/LayoutNavigationSettings/@promotionImage=''">
            <xsl:text disable-output-escaping="yes">grid__col-lg-3 grid__col-md-3 grid__col-sm-4 grid__col-xs-12</xsl:text>
          </xsl:if>
          <xsl:if test="/NavigationTree/Settings/LayoutNavigationSettings/@promotionImage!=''">
            <xsl:text disable-output-escaping="yes">grid__col-lg-4 grid__col-md-4 grid__col-sm-4 grid__col-xs-12</xsl:text>
          </xsl:if>
          <xsl:if test="@RelativeLevel='1'">
            <xsl:text disable-output-escaping="yes"> dw-navbar-button</xsl:text>
          </xsl:if>
        </xsl:attribute>

        <xsl:if test="@Allowclick='True'">
          <div>
            <xsl:attribute name="class">
              <xsl:text disable-output-escaping="yes">mega-menu__header-container dw-mod</xsl:text>
            </xsl:attribute>
            <a>
              <xsl:attribute name="class">
                <xsl:text disable-output-escaping="yes">mega-menu__header-container__text dw-mod</xsl:text>
              </xsl:attribute>
              <xsl:attribute name="href">
                <xsl:value-of select="@FriendlyHref" disable-output-escaping="yes"/>
              </xsl:attribute>
              <!--<img>
              <xsl:attribute name="src">
                <xsl:value-of select="@SmallImage" disable-output-escaping="yes"/>
              </xsl:attribute>
            </img>-->
              <xsl:value-of select="@MenuText" disable-output-escaping="yes"/>
            </a>
          </div>
        </xsl:if>
        <xsl:if test="@Allowclick!='True'">
            <xsl:attribute name="class">
              <xsl:text disable-output-escaping="yes">mega-menu__header dw-mod</xsl:text>
            </xsl:attribute>
            <xsl:value-of select="@MenuText" disable-output-escaping="yes"/>
        </xsl:if>

        <xsl:if test="count(Page) and /NavigationTree/Settings/LayoutNavigationSettings/@endlevel > @RelativeLevel">
            <ul class="menu dw-mod">
              <xsl:apply-templates select="Page">
                <xsl:with-param name="depth" select="$depth+1"/>
                <xsl:with-param name="type" select="'list'"/>
              </xsl:apply-templates>
            </ul>
        </xsl:if>
      </div>
      </xsl:when>
  </xsl:choose>
</xsl:template>
</xsl:stylesheet>