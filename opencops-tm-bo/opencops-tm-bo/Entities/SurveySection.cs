using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace opencops_tm_bo.Entities;

[Table("survey_section")]
public partial class SurveySection
{
    [Key]
    [Column("section_id")]
    public int SectionId { get; set; }

    [Column("section_name")]
    [StringLength(500)]
    [Unicode(false)]
    public string SectionName { get; set; } = null!;

    [Column("section_token")]
    [StringLength(50)]
    [Unicode(false)]
    public string SectionToken { get; set; } = null!;

    [Column("custom")]
    public bool? Custom { get; set; }

    [Column("created_on", TypeName = "datetime")]
    public DateTime CreatedOn { get; set; }
}
