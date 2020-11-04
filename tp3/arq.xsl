<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="site/index.html">
            <html>
                <head>
                    <meta charset="UTF-8" />
                    <title>Arquivo Arqueosítios NW Português</title>
                </head>
                <body>
                    <h2>Arquivo Arqueosítios NW Português</h2>
                    <table border="1" width="100%">
                        <tr>
                            <td width="30%" valign="top">
                                <h3>Índice de Arqueosítios</h3>
                                <ol>
                                    <xsl:apply-templates select="//ARQELEM" mode="indice">
                                        <xsl:sort select="IDENTI"/>
                                    </xsl:apply-templates>
                                </ol>
                            </td>
                        </tr>
                    </table>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a href="{generate-id()}.html">
                <xsl:value-of select="IDENTI"/>
            </a>  
        </li>
    </xsl:template>
    
    <xsl:template match="/ARQSITS">
        <xsl:apply-templates select="//ARQELEM" mode="document">
            <xsl:sort select="IDENTI"/>       
        </xsl:apply-templates>
    </xsl:template>
    
    <xsl:template match="ARQELEM" mode="document">
        <xsl:result-document href="site/{generate-id()}.html">
            <html>
                <head>
                    <meta charset="UTF-8" />
                    <title>Arquivo Arqueosítios NW Português</title>
                </head>
                <body>
                    <h2>Arquivo Arqueosítios NW Português</h2>                         
                    
                    <p><b>Identidade:</b> <xsl:value-of select="IDENTI"/></p>
                    <p><b>Descrição:</b> <xsl:value-of select="DESCRI"/></p>
                    <xsl:if test="LUGAR and FREGUE and CONCEL"><p><b>Localização:</b> <xsl:value-of select="LUGAR"/>, <xsl:value-of select="FREGUE"/>, <xsl:value-of select="CONCEL"/></p></xsl:if>
                    <xsl:if test="LATITU and LONGIT and ALTITU"><p><b>Coordenadas geográficas:</b> Lat. <xsl:value-of select="LATITU"/>; Longit. <xsl:value-of select="LONGIT"/>; Altitude: <xsl:value-of select="ALTITU"/></p></xsl:if>
                    <xsl:if test="ACESSO"><p><b>Acesso:</b> <xsl:value-of select="ACESSO"/></p></xsl:if>
                    <xsl:if test="QUADRO"><p><b>Enquadramento Geográfico:</b> <xsl:value-of select="QUADRO"/></p></xsl:if>
                    <xsl:if test="DESARQ"><p><b>Descoberta Arqueológica:</b> <xsl:value-of select="DESARQ"/></p></xsl:if>
                    <xsl:if test="TRAARQ"><p><b>Trabalho Arqueológico:</b> <xsl:value-of select="TRAARQ"/></p></xsl:if>
                    <xsl:if test="DEPOSI"><p><b>Depósito Arqueológico:</b> <xsl:value-of select="DEPOSI"/></p></xsl:if>
                    <xsl:if test="INTERE"><p><b>Curiosidades:</b> <xsl:value-of select="INTERE"/></p></xsl:if>
                    <xsl:if test="BIBLIO">
                        <b>Bibliografia:</b>
                        <ul>
                            <xsl:for-each select="BIBLIO">
                                <li><xsl:value-of select="."/></li>
                            </xsl:for-each>
                        </ul>
                    </xsl:if>
                    <address>
                        [<a href="index.html">Voltar ao índice</a>]
                    </address>
                    <center>
                        <hr width="80%"/>
                    </center>
                </body>
            </html>
        </xsl:result-document>
    </xsl:template>
</xsl:stylesheet>