using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace opencops_tm_bo.Entities;

[Table("survey_subsection")]
public partial class SurveySubsection
{
    [Key]
    [Column("subsection_id")]
    public int SubsectionId { get; set; }

    [Column("section_id")]
    public int SectionId { get; set; }

    [Column("section_name")]
    [StringLength(500)]
    [Unicode(false)]
    public string SectionName { get; set; } = null!;

    [Column("subsection_name")]
    [StringLength(500)]
    [Unicode(false)]
    public string SubsectionName { get; set; } = null!;

    [Column("subsection_token")]
    [StringLength(50)]
    [Unicode(false)]
    public string SubsectionToken { get; set; } = null!;

    [Column("created_on", TypeName = "datetime")]
    public DateTime CreatedOn { get; set; }

    [Column("custom")]
    public bool? Custom { get; set; }
}
