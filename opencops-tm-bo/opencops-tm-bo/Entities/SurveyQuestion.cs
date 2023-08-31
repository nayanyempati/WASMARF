using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace opencops_tm_bo.Entities;

[Table("survey_question")]
public partial class SurveyQuestion
{
    [Key]
    [Column("survey_question_id")]
    public int SurveyQuestionId { get; set; }

    [Column("section_id")]
    public int SectionId { get; set; }

    [Column("section_name")]
    [StringLength(500)]
    [Unicode(false)]
    public string SectionName { get; set; } = null!;

    [Column("subsection_id")]
    public int SubsectionId { get; set; }

    [Column("subsection_name")]
    [StringLength(500)]
    [Unicode(false)]
    public string SubsectionName { get; set; } = null!;

    [Column("survey_question_description")]
    [StringLength(500)]
    [Unicode(false)]
    public string SurveyQuestionDescription { get; set; } = null!;

    [Column("survey_question_token")]
    [StringLength(50)]
    [Unicode(false)]
    public string SurveyQuestionToken { get; set; } = null!;

    [Column("created_on", TypeName = "datetime")]
    public DateTime CreatedOn { get; set; }

    [Column("survey_question")]
    [StringLength(500)]
    [Unicode(false)]
    public string SurveyQuestion1 { get; set; } = null!;

    [Column("survey_question_format")]
    [StringLength(50)]
    [Unicode(false)]
    public string SurveyQuestionFormat { get; set; } = null!;
}
