<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:user="urn:my-scripts" exclude-result-prefixes="msxsl user">
  <msxsl:script language="C#" implements-prefix="user">
    <msxsl:assembly name="Dynamicweb" />
    <msxsl:assembly name="Dynamicweb.Ecommerce" />
    <msxsl:assembly name="Dynamicweb.Core" />
    <msxsl:assembly name="Dynamicweb.Security" />
    <msxsl:assembly name="System.IO" />
    <![CDATA[
    /*
     * Get group number from group id in query string
     */

    public string GetCustomFieldString(string groupLink, string systemName)
		  {
			var match = System.Text.RegularExpressions.Regex.Match(groupLink, @"GroupID=(?<GroupID>[^&]+)");

			if (match.Success)
			{
				var groupId = match.Groups["GroupID"].Value;

				var g = Dynamicweb.Ecommerce.Products.Group.GetGroupById(groupId);
				if (g != null && !string.IsNullOrEmpty(g.ProductGroupFieldValues.GetProductGroupFieldValue(systemName).Value.ToString()))
				{
					var ctaHeading = Dynamicweb.Core.Converter.ToString(g.ProductGroupFieldValues.GetProductGroupFieldValue(systemName).Value);
					return ctaHeading;
				}
			}
			return string.Empty;
		}

    public string GenerateHeadingImageUrl(string image)
		{
      string imageUrl = image;

			if (System.IO.Path.GetExtension(image).ToLower() != ".svg") {
          imageUrl = "/Admin/Public/GetImage.ashx?width=150&height=100&amp;crop=5&DoNotUpscale=true&FillCanvas=true&Compression=75&image=" + @image;
      }
			return imageUrl.Replace("/Billeder", "/Files/Images");
		}
]]>
</msxsl:script>

  <xsl:output method="xml" omit-xml-declaration="yes" indent="yes" encoding="utf-8" />
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

    <xsl:if test="@RelativeLevel>=/NavigationTree/Settings/LayoutNavigationSettings/@ecomStartLevel">
      <xsl:choose>
          <xsl:when test="$type = 'list'">
              <li>
                <xsl:attribute name="class">
                  <xsl:text disable-output-escaping="yes">menu__item menu__item--mega dw-mod</xsl:text>
                  <xsl:if test="@RelativeLevel=/NavigationTree/Settings/LayoutNavigationSettings/@ecomStartLevel">
                    <xsl:text disable-output-escaping="yes"> menu__item--horizontal</xsl:text>
                    <xsl:text disable-output-escaping="yes"> menu__item--top-level</xsl:text>
                    <xsl:text disable-output-escaping="yes"> dw-navbar-button</xsl:text>
                    <xsl:if test="count(Page) and /NavigationTree/Settings/LayoutNavigationSettings/@endlevel > @RelativeLevel">
                      <xsl:text disable-output-escaping="yes"> is-mega</xsl:text>
                    </xsl:if>
                  </xsl:if>
                  <xsl:if test="@InPath='True' or @Active='True'"> menu__item--active </xsl:if>
                  <xsl:if test="@Allowclick!='True'"> menu__item--disabled</xsl:if>
                </xsl:attribute>
                <xsl:if test="@Allowclick='True'">
                  <a>
                    <xsl:attribute name="class">
                      <xsl:if test="@RelativeLevel=/NavigationTree/Settings/LayoutNavigationSettings/@ecomStartLevel">
                        <xsl:text disable-output-escaping="yes">menu__link dw-mod</xsl:text>
                        <xsl:if test="@InPath='True' or @Active='True'"> menu__link--active </xsl:if>
                      </xsl:if>
                      <xsl:if test="@RelativeLevel>/NavigationTree/Settings/LayoutNavigationSettings/@ecomStartLevel">
                        <xsl:text disable-output-escaping="yes"> mega-menu__link dw-mod</xsl:text>
                        <xsl:if test="@InPath='True' or @Active='True'"> mega-menu__link--active </xsl:if>
                      </xsl:if>
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
                        <xsl:text disable-output-escaping="yes">menu__link dw-mod</xsl:text>
                        <xsl:if test="@InPath='True' or @Active='True'"> menu__link--active </xsl:if>
                      </xsl:if>
                      <xsl:if test="@RelativeLevel>/NavigationTree/Settings/LayoutNavigationSettings/@ecomStartLevel">
                        <xsl:text disable-output-escaping="yes"> mega-menu__link dw-mod</xsl:text>
                        <xsl:if test="@InPath='True' or @Active='True'"> mega-menu__link--active </xsl:if>
                      </xsl:if>
                    </xsl:attribute>
                    <xsl:value-of select="@MenuText" disable-output-escaping="yes"/>
                  </span>
                </xsl:if>
                <xsl:if test="count(Page) and /NavigationTree/Settings/LayoutNavigationSettings/@endlevel > @RelativeLevel">
                  <xsl:if test="@RelativeLevel=/NavigationTree/Settings/LayoutNavigationSettings/@ecomStartLevel">
                    <xsl:variable name="ctaImage" select="user:GetCustomFieldString(@Href, 'ctaImage')"/>
                    <xsl:variable name="ctaHeading" select="user:GetCustomFieldString(@Href, 'ctaHeader')"/>
                    <xsl:variable name="ctaLink" select="user:GetCustomFieldString(@Href, 'ctaLink')"/>
                    <xsl:variable name="ctaLinkText" select="user:GetCustomFieldString(@Href, 'ctaLinkText')"/>

                    <div class="menu mega-menu dw-mod">
                      <div class="grid grid--align-content-start">
                        <xsl:if test="$ctaImage or /NavigationTree/Settings/LayoutNavigationSettings/@promotionImage!=''">
                          <div class="grid__col-9 grid__col--bleed">
                            <div class="grid grid--align-content-start">
                              <xsl:apply-templates select="Page">
                                <xsl:with-param name="depth" select="$depth+1"/>
                                <xsl:with-param name="type" select="'grid'"/>
                              </xsl:apply-templates>
                            </div>
                          </div>
                          <div class="grid__col-3 mega-menu__promotion-image">
                            <xsl:if test="$ctaImage">
                                <a class="flex-img">
                                  <xsl:attribute name="href">
                                    <xsl:if test="$ctaLink!=''">
                                      <xsl:value-of select="$ctaLink" disable-output-escaping="yes"/>
                                    </xsl:if>
                                    <xsl:if test="$ctaLink=''">
                                      <xsl:value-of select="@FriendlyHref" disable-output-escaping="yes"/>
                                    </xsl:if>
                                  </xsl:attribute>
                                  <img>
                                    <xsl:attribute name="src">
                                      <xsl:text disable-output-escaping="yes">/Admin/Public/GetImage.ashx?width=300&amp;crop=5&amp;DoNotUpscale=true&amp;Compression=75&amp;image=/Images/</xsl:text>
                                      <xsl:value-of select="$ctaImage" disable-output-escaping="yes"/>
                                    </xsl:attribute>
                                    <xsl:attribute name="alt">
                                      <xsl:value-of select="$ctaHeading" disable-output-escaping="yes"/>
                                    </xsl:attribute>
                                  </img>
                                </a>
                                <xsl:if test="$ctaHeading">
                                  <div>
                                    <xsl:attribute name="class">mega-menu__link u-no-padding u-margin-bottom dw-mod</xsl:attribute>
                                    <xsl:value-of select="$ctaHeading" disable-output-escaping="yes"/>
                                  </div>
                                </xsl:if>
                                <xsl:if test="$ctaLinkText">
                                  <a>
                                    <xsl:attribute name="class">btn btn--primary dw-mod</xsl:attribute>
                                    <xsl:attribute name="href">
                                      <xsl:if test="$ctaLink!=''">
                                        <xsl:value-of select="$ctaLink" disable-output-escaping="yes"/>
                                      </xsl:if>
                                      <xsl:if test="$ctaLink=''">
                                        <xsl:value-of select="@FriendlyHref" disable-output-escaping="yes"/>
                                      </xsl:if>
                                    </xsl:attribute>
                                    <xsl:value-of select="$ctaLinkText" disable-output-escaping="yes"/>
                                  </a>
                                </xsl:if>
                            </xsl:if>
                            <xsl:if test="/NavigationTree/Settings/LayoutNavigationSettings/@promotionImage!=''">
                              <a class="flex-img">
                                <xsl:attribute name="href">
                                  <xsl:value-of select="/NavigationTree/Settings/LayoutNavigationSettings/@promotionLink" disable-output-escaping="yes"/>
                                </xsl:attribute>
                                <img alt="">
                                  <xsl:attribute name="src">
                                    <xsl:value-of select="/NavigationTree/Settings/LayoutNavigationSettings/@promotionImage" disable-output-escaping="yes"/>
                                  </xsl:attribute>
                                </img>
                              </a>
                            </xsl:if>
                          </div>
                        </xsl:if>

                        <xsl:if test="not($ctaImage) and /NavigationTree/Settings/LayoutNavigationSettings/@promotionImage=''">
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
                    <xsl:if test="@SmallImage != ''">
                      <img class="u-margin-bottom">
                        <xsl:attribute name="src">
                          <xsl:variable name="groupImage" select="user:GenerateHeadingImageUrl(@SmallImage)"/>
                          <xsl:value-of select="$groupImage" disable-output-escaping="yes"/>
                        </xsl:attribute>
                        <xsl:attribute name="alt">
                          <xsl:value-of select="@MenuText" disable-output-escaping="yes"/>
                        </xsl:attribute>
                      </img>
                    </xsl:if>
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
    </xsl:if>

    <xsl:if test="@RelativeLevel=/NavigationTree/Settings/LayoutNavigationSettings/@startLevel">
      <xsl:apply-templates select="Page">
        <xsl:with-param name="depth" select="$depth+1"/>
        <xsl:with-param name="type" select="'list'"/>
      </xsl:apply-templates>
    </xsl:if>
</xsl:template>
</xsl:stylesheet>