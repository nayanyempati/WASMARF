using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using opencops_tm_bo.Entities;
using opencops_tm_bo.Interfaces;
using System.Reflection.Metadata;
using Syncfusion.DocIO.DLS;
using Syncfusion.DocIO;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using Syncfusion.Drawing;
using Syncfusion.DocIORenderer;

namespace opencops_tm_bo.Controllers
{
    [Route("api/report")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly dbCon _dbcon = new dbCon();
        private readonly ILogger<ReportController> _logger;
        public ReportController(dbCon dbcon, IAccount account, ILogger<ReportController> logger, IUser user)
        {
            _dbcon = dbcon;
            _logger = logger;
        }

        [HttpGet("generate/{projectid}")]
        public async Task<FileResult> Generate(int projectid)
        {
            using var fileStreamPath = new FileStream(System.IO.Directory.GetCurrentDirectory() + "/Report/Report.docx", FileMode.Open, FileAccess.ReadWrite, FileShare.ReadWrite);
            using var document = new WordDocument(fileStreamPath, FormatType.Automatic);
            document.EnsureMinimal();
            try
            {
                var projectDetails = await _dbcon.Projects.FirstOrDefaultAsync(x=>x.ProjectId==projectid);
                if(projectDetails!=null)
                {
                    //TITLE CASE
                    TextInfo textInfo = new CultureInfo("en-US", false).TextInfo;
                    //CREATE FIRST PAGE SECTION
                    IWSection Mainsection = document.Sections[0] as WSection;
                    IWTable table;
                    WTableRow row;
                    WTableCell cell;
                    WPicture picture;
                    IWTextRange textRange;
                    //INITIALZING PICTURE
                    IWParagraph wParagraph = Mainsection.HeadersFooters.FirstPageHeader.AddParagraph();
                    Stream logoStream = new MemoryStream();
                    Stream bgImageStream = new MemoryStream();

                    using (HttpClient httpClient = new HttpClient())
                    {
                        byte[] logoBytes = await httpClient.GetByteArrayAsync("https://app.secureway.io/assets/images/logo/logo.png");
                        byte[] bgImageBytes = await httpClient.GetByteArrayAsync("https://vmc-opencops.s3.ap-south-1.amazonaws.com/Org_Logo/bg.png");
                        logoStream = new MemoryStream(logoBytes);
                        bgImageStream = new MemoryStream(bgImageBytes);

                        wParagraph = Mainsection.AddParagraph();
                        picture = (WPicture)wParagraph.AppendPicture(logoStream);
                        picture.LockAspectRatio = true;
                        picture.Width = 220f;

                    }

                    textRange = wParagraph.AppendText("\n");
                    textRange = wParagraph.AppendText("\n");

                    wParagraph = Mainsection.AddParagraph();
                    Shape bgRectangle = wParagraph.AppendShape(AutoShapeType.Rectangle, Mainsection.PageSetup.PageSize.Width, 320);
                    bgRectangle.FillFormat.Fill = true;
                    bgRectangle.FillFormat.Color = Color.FromArgb(16, 16, 39);
                    bgRectangle.IsBelowText = true;

                    bgRectangle.HorizontalOrigin = HorizontalOrigin.Page;
                    bgRectangle.HorizontalPosition = 0;
                    bgRectangle.VerticalPosition = 0;
                    bgRectangle.WidthScale = Mainsection.PageSetup.PageSize.Width;
                    textRange = wParagraph.AppendText("\n");
                    textRange = wParagraph.AppendText("\n");
                    textRange = wParagraph.AppendText("\n");
                    textRange = wParagraph.AppendText("\n");
                    textRange = wParagraph.AppendText("\n");
                    textRange = wParagraph.AppendText("WASMARF REPORT");
                    textRange.CharacterFormat.Bold = true;
                    textRange.CharacterFormat.FontName = "Calibri (Headings)";
                    textRange.CharacterFormat.TextColor = Color.White;
                    textRange.CharacterFormat.FontSize = 36;
                    wParagraph.ParagraphFormat.AfterSpacing = 0;
                    wParagraph.ParagraphFormat.BeforeSpacing = 0;
                    wParagraph.ParagraphFormat.LineSpacingRule = LineSpacingRule.Exactly;
                    wParagraph.ParagraphFormat.HorizontalAlignment = HorizontalAlignment.Center;
                    //ADD REPORT NAME
                    wParagraph = Mainsection.AddParagraph();
                    textRange = wParagraph.AppendText(projectDetails.ProjectName.ToString());
                    textRange.CharacterFormat.Bold = false;
                    textRange.CharacterFormat.FontName = "Calibri (Headings)";
                    textRange.CharacterFormat.TextColor = Color.Gray;
                    textRange.CharacterFormat.FontSize = 24;
                    wParagraph.ParagraphFormat.AfterSpacing = 0;
                    wParagraph.ParagraphFormat.BeforeSpacing = 0;
                    wParagraph.ParagraphFormat.LineSpacingRule = LineSpacingRule.Exactly;
                    wParagraph.ParagraphFormat.HorizontalAlignment = HorizontalAlignment.Center;
                    textRange = wParagraph.AppendText("\n");
                    textRange = wParagraph.AppendText("\n");
                    textRange = wParagraph.AppendText("\n");
                    textRange = wParagraph.AppendText("\n");
                    textRange = wParagraph.AppendText("\n");
                    textRange = wParagraph.AppendText("\n");
                    textRange = wParagraph.AppendText("\n");

                    //COPYRIGHT SECTION
                    IWSection copyrightSection = document.AddSection();

                    wParagraph = copyrightSection.AddParagraph();
                    textRange = wParagraph.AppendText("COPYRIGHT:");
                    textRange.CharacterFormat.Bold = true;
                    wParagraph.ApplyStyle(BuiltinStyle.Normal);

                    wParagraph = copyrightSection.AddParagraph();
                    textRange = wParagraph.AppendText("All intellectual property rights in this work belong to SecureWay. The information contained in this document must not be reproduced or distributed to others in any form or by any means, electronic or mechanical, for any purpose, without the prior permission of SecureWay, or used except as expressly authorized in writing by SecureWay. This document is provided on the understanding that its use will be confined to the officers of your Company, and that no part of its contents will be disclosed to third parties or our direct competitors without prior written consent of SecureWay Copyright © 2023 SecureWay. All Rights Reserved.");
                    wParagraph.ApplyStyle(BuiltinStyle.Normal);

                    //CREATE SPACE
                    wParagraph = copyrightSection.AddParagraph();
                    textRange = wParagraph.AppendText("");

                    wParagraph = copyrightSection.AddParagraph();
                    textRange = wParagraph.AppendText("CONFIDENTIALITY:");
                    textRange.CharacterFormat.Bold = true;
                    wParagraph.ApplyStyle(BuiltinStyle.Normal);

                    wParagraph = copyrightSection.AddParagraph();
                    textRange = wParagraph.AppendText("The materials and information contained herein constitute confidential information of SecureWay and Customer shall not disclose or transfer any of these materials or information to any third party. The recipient should not disclose this information to any third party without the prior written permission of SecureWay.");
                    wParagraph.ApplyStyle(BuiltinStyle.Normal);


                    //CREATE SPACE
                    wParagraph = copyrightSection.AddParagraph();
                    textRange = wParagraph.AppendText("");

                    wParagraph = copyrightSection.AddParagraph();
                    textRange = wParagraph.AppendText("TRADEMARKS:");
                    textRange.CharacterFormat.Bold = true;
                    wParagraph.ApplyStyle(BuiltinStyle.Normal);

                    wParagraph = copyrightSection.AddParagraph();
                    textRange = wParagraph.AppendText("All company, brand, and product names are referenced for identification purposes only and may be trademarks or registered trademarks that are the sole property of their respective owners.");
                    wParagraph.ApplyStyle(BuiltinStyle.Normal);

                    //TABLE OF CONTENT
                    IWSection tocSection = document.AddSection();
                    wParagraph = tocSection.AddParagraph();
                    textRange = wParagraph.AppendText("TABLE OF CONTENT");
                    textRange.CharacterFormat.Bold = true;
                    textRange.CharacterFormat.FontName = "Calibri (Headings)";
                    textRange.CharacterFormat.FontSize = 16;
                    textRange.CharacterFormat.TextColor = Color.FromArgb(7, 40, 73);
                    wParagraph.AppendTOC(1, 2);

                    //DOCUMENT DETAILS SECTION
                    IWSection documentSection = document.AddSection();
                    wParagraph = documentSection.AddParagraph();
                    textRange = wParagraph.AppendText("DOCUMENT DETAILS");
                    wParagraph.ApplyStyle(BuiltinStyle.Heading1);

                    table = documentSection.AddTable();
                    table.TableFormat.Borders.BorderType = BorderStyle.Single;
                    table.TableFormat.Borders.Color = Color.FromArgb(7, 40, 73);
                    row = table.AddRow();

                    //ATTRIBUTE ROW
                    cell = row.AddCell();
                    cell.Width = 150f;
                    textRange = cell.AddParagraph().AppendText("ATTRIBUTE");
                    cell.CellFormat.BackColor = Color.FromArgb(7, 40, 73);
                    textRange.CharacterFormat.FontSize = 12;
                    textRange.CharacterFormat.TextColor = Color.White;
                    textRange.CharacterFormat.FontName = "Calibri (Body)";
                    textRange.CharacterFormat.Bold = false;
                    wParagraph.ParagraphFormat.HorizontalAlignment = Syncfusion.DocIO.DLS.HorizontalAlignment.Left;

                    //VALUES LABEL
                    cell = row.AddCell();
                    cell.Width = 320f;
                    textRange = cell.AddParagraph().AppendText("VALUES");
                    cell.CellFormat.BackColor = Color.FromArgb(7, 40, 73);
                    textRange.CharacterFormat.FontSize = 12;
                    textRange.CharacterFormat.TextColor = Color.White;
                    textRange.CharacterFormat.FontName = "Calibri (Body)";
                    textRange.CharacterFormat.Bold = false;
                    wParagraph.ParagraphFormat.HorizontalAlignment = Syncfusion.DocIO.DLS.HorizontalAlignment.Left;

                    row = table.AddRow(true, false);

                    cell = row.AddCell();
                    cell.Width = 150f;
                    textRange = cell.AddParagraph().AppendText("Date");
                    cell.CellFormat.BackColor = Color.FromArgb(255, 255, 255);
                    textRange.CharacterFormat.FontSize = 12;
                    textRange.CharacterFormat.TextColor = Color.Black;
                    textRange.CharacterFormat.FontName = "Calibri (Body)";
                    textRange.CharacterFormat.Bold = false;
                    wParagraph.ParagraphFormat.HorizontalAlignment = Syncfusion.DocIO.DLS.HorizontalAlignment.Left;

                    cell = row.AddCell();
                    cell.Width = 320f;
                    textRange = cell.AddParagraph().AppendText(DateTime.Now.ToString("dd MMMM yyyy"));
                    cell.CellFormat.BackColor = Color.FromArgb(255, 255, 255);
                    textRange.CharacterFormat.FontSize = 12;
                    textRange.CharacterFormat.TextColor = Color.Black;
                    textRange.CharacterFormat.FontName = "Calibri (Body)";
                    textRange.CharacterFormat.Bold = false;
                    wParagraph.ParagraphFormat.HorizontalAlignment = Syncfusion.DocIO.DLS.HorizontalAlignment.Left;

                    row = table.AddRow(true, false);

                    cell = row.AddCell();
                    cell.Width = 150f;
                    textRange = cell.AddParagraph().AppendText("Document Title");
                    cell.CellFormat.BackColor = Color.FromArgb(255, 255, 255);
                    textRange.CharacterFormat.FontSize = 12;
                    textRange.CharacterFormat.TextColor = Color.Black;
                    textRange.CharacterFormat.FontName = "Calibri (Body)";
                    textRange.CharacterFormat.Bold = false;
                    wParagraph.ParagraphFormat.HorizontalAlignment = Syncfusion.DocIO.DLS.HorizontalAlignment.Left;

                    cell = row.AddCell();
                    cell.Width = 320f;
                    textRange = cell.AddParagraph().AppendText(projectDetails.ProjectName);
                    cell.CellFormat.BackColor = Color.FromArgb(255, 255, 255);
                    textRange.CharacterFormat.FontSize = 12;
                    textRange.CharacterFormat.TextColor = Color.Black;
                    textRange.CharacterFormat.FontName = "Calibri (Body)";
                    textRange.CharacterFormat.Bold = false;
                    wParagraph.ParagraphFormat.HorizontalAlignment = Syncfusion.DocIO.DLS.HorizontalAlignment.Left;

                    row = table.AddRow(true, false);

                    cell = row.AddCell();
                    cell.Width = 150f;
                    textRange = cell.AddParagraph().AppendText("Document Classification");
                    cell.CellFormat.BackColor = Color.FromArgb(255, 255, 255);
                    textRange.CharacterFormat.FontSize = 12;
                    textRange.CharacterFormat.TextColor = Color.Black;
                    textRange.CharacterFormat.FontName = "Calibri (Body)";
                    textRange.CharacterFormat.Bold = false;
                    wParagraph.ParagraphFormat.HorizontalAlignment = Syncfusion.DocIO.DLS.HorizontalAlignment.Left;

                    cell = row.AddCell();
                    cell.Width = 320f;
                    textRange = cell.AddParagraph().AppendText("Confidential");
                    cell.CellFormat.BackColor = Color.FromArgb(255, 255, 255);
                    textRange.CharacterFormat.FontSize = 12;
                    textRange.CharacterFormat.TextColor = Color.Black;
                    textRange.CharacterFormat.FontName = "Calibri (Body)";
                    textRange.CharacterFormat.Bold = false;
                    wParagraph.ParagraphFormat.HorizontalAlignment = Syncfusion.DocIO.DLS.HorizontalAlignment.Left;

                    row = table.AddRow(true, false);

                    cell = row.AddCell();
                    cell.Width = 150f;
                    textRange = cell.AddParagraph().AppendText("Document Circulation");
                    cell.CellFormat.BackColor = Color.FromArgb(255, 255, 255);
                    textRange.CharacterFormat.FontSize = 12;
                    textRange.CharacterFormat.TextColor = Color.Black;
                    textRange.CharacterFormat.FontName = "Calibri (Body)";
                    textRange.CharacterFormat.Bold = false;
                    wParagraph.ParagraphFormat.HorizontalAlignment = Syncfusion.DocIO.DLS.HorizontalAlignment.Left;

                    cell = row.AddCell();
                    cell.Width = 320f;
                    textRange = cell.AddParagraph().AppendText("Internal, Private (not for public circulation)");
                    cell.CellFormat.BackColor = Color.FromArgb(255, 255, 255);
                    textRange.CharacterFormat.FontSize = 12;
                    textRange.CharacterFormat.TextColor = Color.Black;
                    textRange.CharacterFormat.FontName = "Calibri (Body)";
                    textRange.CharacterFormat.Bold = false;
                    wParagraph.ParagraphFormat.HorizontalAlignment = Syncfusion.DocIO.DLS.HorizontalAlignment.Left;

                    row = table.AddRow(true, false);

                    cell = row.AddCell();
                    cell.Width = 150f;
                    textRange = cell.AddParagraph().AppendText("Project Id");
                    cell.CellFormat.BackColor = Color.FromArgb(255, 255, 255);
                    textRange.CharacterFormat.FontSize = 12;
                    textRange.CharacterFormat.TextColor = Color.Black;
                    textRange.CharacterFormat.FontName = "Calibri (Body)";
                    textRange.CharacterFormat.Bold = false;
                    wParagraph.ParagraphFormat.HorizontalAlignment = Syncfusion.DocIO.DLS.HorizontalAlignment.Left;

                    cell = row.AddCell();
                    cell.Width = 320f;
                    textRange = cell.AddParagraph().AppendText("PRO-"+projectDetails.ProjectId);
                    cell.CellFormat.BackColor = Color.FromArgb(255, 255, 255);
                    textRange.CharacterFormat.FontSize = 12;
                    textRange.CharacterFormat.TextColor = Color.Black;
                    textRange.CharacterFormat.FontName = "Calibri (Body)";
                    textRange.CharacterFormat.Bold = false;
                    wParagraph.ParagraphFormat.HorizontalAlignment = Syncfusion.DocIO.DLS.HorizontalAlignment.Left;

                    row = table.AddRow(true, false);

                    cell = row.AddCell();
                    cell.Width = 150f;
                    textRange = cell.AddParagraph().AppendText("Risk Policy");
                    cell.CellFormat.BackColor = Color.FromArgb(255, 255, 255);
                    textRange.CharacterFormat.FontSize = 12;
                    textRange.CharacterFormat.TextColor = Color.Black;
                    textRange.CharacterFormat.FontName = "Calibri (Body)";
                    textRange.CharacterFormat.Bold = false;
                    wParagraph.ParagraphFormat.HorizontalAlignment = Syncfusion.DocIO.DLS.HorizontalAlignment.Left;

                    cell = row.AddCell();
                    cell.Width = 320f;
                    textRange = cell.AddParagraph().AppendText(projectDetails.RiskPolicyName);
                    cell.CellFormat.BackColor = Color.FromArgb(255, 255, 255);
                    textRange.CharacterFormat.FontSize = 12;
                    textRange.CharacterFormat.TextColor = Color.Black;
                    textRange.CharacterFormat.FontName = "Calibri (Body)";
                    textRange.CharacterFormat.Bold = false;
                    wParagraph.ParagraphFormat.HorizontalAlignment = Syncfusion.DocIO.DLS.HorizontalAlignment.Left;

                    row = table.AddRow(true, false);

                    //APPROACH  SECTION
                    IWSection approachSection = document.AddSection();
                    wParagraph = approachSection.AddParagraph();
                    textRange = wParagraph.AppendText("DESCRIPTION");
                    wParagraph.ApplyStyle(BuiltinStyle.Heading1);

                    wParagraph = approachSection.AddParagraph();
                    textRange = wParagraph.AppendText(projectDetails.ProjctDescription);
                    wParagraph.ApplyStyle(BuiltinStyle.Normal);

                    //APPROACH  SECTION
                    IWSection componentsSection = document.AddSection();
                    wParagraph = componentsSection.AddParagraph();
                    textRange = wParagraph.AppendText("COMPONENTS");
                    wParagraph.ApplyStyle(BuiltinStyle.Heading1);

                   
                    var components = await _dbcon.ProjectComponentMappings.Where(x => x.ProjectId == projectid).ToListAsync();
                    foreach( var component in components)
                    {
                        wParagraph = componentsSection.AddParagraph();
                        textRange = wParagraph.AppendText(await _dbcon.Components.Where(x=>x.ComponentId==component.Id).Select(x=>x.ComponentName).FirstOrDefaultAsync());
                        wParagraph.ApplyStyle(BuiltinStyle.Normal);
                
                    }


                    IWSection weaknessection = document.AddSection();
                    wParagraph = weaknessection.AddParagraph();
                    textRange = wParagraph.AppendText("WEAKNESS & COUNTERMEASURES");
                    wParagraph.ApplyStyle(BuiltinStyle.Heading1);

                    foreach (var component in components)
                    {
                        var weaknesses = await _dbcon.ComponentWeaknessMappings.Where(x => x.ComponentId == component.Id).ToListAsync();
                        foreach(var weakness in weaknesses)
                        {
                            var weaknessDetails = await _dbcon.Weaknesses.FirstOrDefaultAsync(x=>x.WeaknessId==weakness.Id);

                            wParagraph = weaknessection.AddParagraph();
                            textRange = wParagraph.AppendText(weaknessDetails.WeaknessName);
                            wParagraph.ApplyStyle(BuiltinStyle.Heading2);

                            table = weaknessection.AddTable();
                            table.TableFormat.Borders.BorderType = BorderStyle.Single;
                            table.TableFormat.Borders.Color = Color.FromArgb(7, 40, 73);
                            row = table.AddRow();

                            

                            cell = row.AddCell();
                            cell.Width = 150f;
                            textRange = cell.AddParagraph().AppendText("WEAKNESS NAME");
                            cell.CellFormat.BackColor = Color.FromArgb(255, 255, 255);
                            textRange.CharacterFormat.FontSize = 12;
                            textRange.CharacterFormat.TextColor = Color.Black;
                            textRange.CharacterFormat.FontName = "Calibri (Body)";
                            textRange.CharacterFormat.Bold = false;
                            wParagraph.ParagraphFormat.HorizontalAlignment = Syncfusion.DocIO.DLS.HorizontalAlignment.Left;

                            cell = row.AddCell();
                            cell.Width = 320f;
                            textRange = cell.AddParagraph().AppendText(weaknessDetails.WeaknessName);
                            cell.CellFormat.BackColor = Color.FromArgb(255, 255, 255);
                            textRange.CharacterFormat.FontSize = 12;
                            textRange.CharacterFormat.TextColor = Color.Black;
                            textRange.CharacterFormat.FontName = "Calibri (Body)";
                            textRange.CharacterFormat.Bold = false;
                            wParagraph.ParagraphFormat.HorizontalAlignment = Syncfusion.DocIO.DLS.HorizontalAlignment.Left;

                            row = table.AddRow(true, false);

                            cell = row.AddCell();
                            cell.Width = 150f;
                            textRange = cell.AddParagraph().AppendText("WEAKNESS DESCRIPTION");
                            cell.CellFormat.BackColor = Color.FromArgb(255, 255, 255);
                            textRange.CharacterFormat.FontSize = 12;
                            textRange.CharacterFormat.TextColor = Color.Black;
                            textRange.CharacterFormat.FontName = "Calibri (Body)";
                            textRange.CharacterFormat.Bold = false;
                            wParagraph.ParagraphFormat.HorizontalAlignment = Syncfusion.DocIO.DLS.HorizontalAlignment.Left;

                            cell = row.AddCell();
                            cell.Width = 320f;
                            textRange = cell.AddParagraph().AppendText(weaknessDetails.WeaknessDescription);
                            cell.CellFormat.BackColor = Color.FromArgb(255, 255, 255);
                            textRange.CharacterFormat.FontSize = 12;
                            textRange.CharacterFormat.TextColor = Color.Black;
                            textRange.CharacterFormat.FontName = "Calibri (Body)";
                            textRange.CharacterFormat.Bold = false;
                            wParagraph.ParagraphFormat.HorizontalAlignment = Syncfusion.DocIO.DLS.HorizontalAlignment.Left;

                            row = table.AddRow(true, false);

                            cell = row.AddCell();
                            cell.Width = 150f;
                            textRange = cell.AddParagraph().AppendText("WEAKNESS RISK RATING");
                            cell.CellFormat.BackColor = Color.FromArgb(255, 255, 255);
                            textRange.CharacterFormat.FontSize = 12;
                            textRange.CharacterFormat.TextColor = Color.Black;
                            textRange.CharacterFormat.FontName = "Calibri (Body)";
                            textRange.CharacterFormat.Bold = false;
                            wParagraph.ParagraphFormat.HorizontalAlignment = Syncfusion.DocIO.DLS.HorizontalAlignment.Left;

                            cell = row.AddCell();
                            cell.Width = 320f;
                            textRange = cell.AddParagraph().AppendText(weaknessDetails.WeaknessRiskRating.ToString());
                            cell.CellFormat.BackColor = Color.FromArgb(255, 255, 255);
                            textRange.CharacterFormat.FontSize = 12;
                            textRange.CharacterFormat.TextColor = Color.Black;
                            textRange.CharacterFormat.FontName = "Calibri (Body)";
                            textRange.CharacterFormat.Bold = false;
                            wParagraph.ParagraphFormat.HorizontalAlignment = Syncfusion.DocIO.DLS.HorizontalAlignment.Left;

                            row = table.AddRow(true, false);

                            cell = row.AddCell();
                            cell.Width = 150f;
                            textRange = cell.AddParagraph().AppendText("WEAKNESS CATEGORY");
                            cell.CellFormat.BackColor = Color.FromArgb(255, 255, 255);
                            textRange.CharacterFormat.FontSize = 12;
                            textRange.CharacterFormat.TextColor = Color.Black;
                            textRange.CharacterFormat.FontName = "Calibri (Body)";
                            textRange.CharacterFormat.Bold = false;
                            wParagraph.ParagraphFormat.HorizontalAlignment = Syncfusion.DocIO.DLS.HorizontalAlignment.Left;

                            cell = row.AddCell();
                            cell.Width = 320f;
                            textRange = cell.AddParagraph().AppendText("weaknessDetails.WeaknessCategory");
                            cell.CellFormat.BackColor = Color.FromArgb(255, 255, 255);
                            textRange.CharacterFormat.FontSize = 12;
                            textRange.CharacterFormat.TextColor = Color.Black;
                            textRange.CharacterFormat.FontName = "Calibri (Body)";
                            textRange.CharacterFormat.Bold = false;
                            wParagraph.ParagraphFormat.HorizontalAlignment = Syncfusion.DocIO.DLS.HorizontalAlignment.Left;

                            row = table.AddRow(true, false);

                            cell = row.AddCell();
                            cell.Width = 150f;
                            textRange = cell.AddParagraph().AppendText("WEAKNESS CWE");
                            cell.CellFormat.BackColor = Color.FromArgb(255, 255, 255);
                            textRange.CharacterFormat.FontSize = 12;
                            textRange.CharacterFormat.TextColor = Color.Black;
                            textRange.CharacterFormat.FontName = "Calibri (Body)";
                            textRange.CharacterFormat.Bold = false;
                            wParagraph.ParagraphFormat.HorizontalAlignment = Syncfusion.DocIO.DLS.HorizontalAlignment.Left;

                            cell = row.AddCell();
                            cell.Width = 320f;
                            textRange = cell.AddParagraph().AppendText(weaknessDetails.WeaknessCwes);
                            cell.CellFormat.BackColor = Color.FromArgb(255, 255, 255);
                            textRange.CharacterFormat.FontSize = 12;
                            textRange.CharacterFormat.TextColor = Color.Black;
                            textRange.CharacterFormat.FontName = "Calibri (Body)";
                            textRange.CharacterFormat.Bold = false;
                            wParagraph.ParagraphFormat.HorizontalAlignment = Syncfusion.DocIO.DLS.HorizontalAlignment.Left;

                            row = table.AddRow(true, false);

                            wParagraph = weaknessection.AddParagraph();
                            textRange = wParagraph.AppendText("COUNTERMEASURES");
                            wParagraph.ApplyStyle(BuiltinStyle.Heading3);
                            var countermeasures = await _dbcon.Countermeasures.Where(x => x.WeaknessId == weaknessDetails.WeaknessId).ToListAsync();
                            foreach(var counter in countermeasures)
                            {
                                wParagraph = weaknessection.AddParagraph();
                                textRange = wParagraph.AppendText(counter.CountermeasureName);
                                textRange.CharacterFormat.Bold = true;
                                wParagraph.ApplyStyle(BuiltinStyle.Heading4);

                                string[] lines = counter.CountermeasureSolution.Split(new[] { Environment.NewLine }, StringSplitOptions.RemoveEmptyEntries);

                                wParagraph = weaknessection.AddParagraph();
                                textRange = wParagraph.AppendText(string.Join(Environment.NewLine, lines));
                                wParagraph.ApplyStyle(BuiltinStyle.Normal);


                            }

                            wParagraph.AppendBreak(BreakType.PageBreak);

                        }
                    }
                        



                    //UPDATE DOCUMENT TABLE OF CONTENT
                    document.UpdateTableOfContents();

                    int iMain = 0;
                    foreach (WSection hfsection in document.Sections)
                    {
                        if (iMain != 0)
                        {
                            hfsection.PageSetup.PageSize = PageSize.A4;
                            hfsection.PageSetup.Margins.Top = 60;
                            hfsection.PageSetup.Margins.Bottom = 60;
                            hfsection.PageSetup.Margins.Left = 60;
                            hfsection.PageSetup.Margins.Right = 60;
                        }
                        if (iMain == 1)
                        {
                            foreach (WParagraph paragraphs in hfsection.Paragraphs)
                            {
                                paragraphs.ParagraphFormat.BeforeSpacing = 6;
                                paragraphs.ParagraphFormat.AfterSpacing = 6;
                                paragraphs.ParagraphFormat.LineSpacing = 15;
                            }
                        }
                        iMain++;
                    }

                }
            }
            catch (Exception ex)
            {

            }
            MemoryStream stream = new MemoryStream();
            document.Save(stream, FormatType.Docx);
            document.Close();
            stream.Position = 0;
            return File(stream, "application/msword", Guid.NewGuid().ToString() + ".docx");
        }
    }
}
