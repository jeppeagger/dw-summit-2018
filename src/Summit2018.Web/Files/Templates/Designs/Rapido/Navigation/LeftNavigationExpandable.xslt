<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
<!--
Made for ecommerce navigation
<ul class="dwnavigation" id="leftnav" data-settings="template:LeftNavigationEcom.xslt">
-->
	<xsl:output method="html" omit-xml-declaration="yes" indent="yes"  encoding="utf-8" />
	<xsl:param name="html-content-type" />
	<xsl:template match="/NavigationTree">

    <xsl:if test="count(//Page) > 0">
      <div>
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
      </div>
    </xsl:if>

	</xsl:template>

	<xsl:template match="//Page">
		<xsl:param name="depth"/>
    <xsl:if test="@AbsoluteLevel = 2">
      <input type="checkbox" class="expand-trigger js-remember-state" checked="">
        <xsl:attribute name="id">LeftMenuExpandableCheck_<xsl:value-of select="@ID"></xsl:value-of>_<xsl:value-of select="position()"></xsl:value-of></xsl:attribute>
      </input>
    </xsl:if>
		<div>
      <xsl:if test="@AbsoluteLevel = 2">
			  <xsl:attribute name="class">expand-box expand-container dw-mod</xsl:attribute>
			  <label>
          <xsl:attribute name="class">expand-box__header expand-container__btn dw-mod</xsl:attribute>
          <xsl:attribute name="for">LeftMenuExpandableCheck_<xsl:value-of select="@ID"></xsl:value-of>_<xsl:value-of select="position()"></xsl:value-of>
        </xsl:attribute>
          <a>
            <xsl:attribute name="href">
              <xsl:value-of select="@FriendlyHref" disable-output-escaping="yes"/>
            </xsl:attribute>
            <xsl:value-of select="@MenuText" disable-output-escaping="yes"/>
          </a>
			  </label>
      </xsl:if>

      <xsl:if test="@AbsoluteLevel = 3">
        <xsl:attribute name="class">expand-box__list-item dw-mod <xsl:if test="@Active='True'"> active </xsl:if> level-<xsl:value-of select="@AbsoluteLevel"></xsl:value-of>
        </xsl:attribute>
        <a>
          <xsl:attribute name="class">expand-box__list-item-link dw-mod <xsl:if test="@Active='True'"> active </xsl:if> level-<xsl:value-of select="@AbsoluteLevel"></xsl:value-of>
          </xsl:attribute>
          <xsl:attribute name="href">
            <xsl:value-of select="@FriendlyHref" disable-output-escaping="yes"/>
          </xsl:attribute>
          <xsl:value-of select="@MenuText" disable-output-escaping="yes"/>
        </a>
      </xsl:if>

			<xsl:if test="count(Page)">
        <xsl:if test="@AbsoluteLevel = 2">
				  <div class="expand-box__content expand-container__content expand-container__content--limit-height dw-mod">
					  <xsl:apply-templates select="Page">
						  <xsl:with-param name="depth" select="$depth+1"/>
					  </xsl:apply-templates>
				  </div>
        </xsl:if>
			</xsl:if>
		</div>
	</xsl:template>

</xsl:stylesheet>