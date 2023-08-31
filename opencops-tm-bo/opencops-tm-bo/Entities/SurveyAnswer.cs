using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace opencops_tm_bo.Entities;

[Table("survey_answers")]
public partial class SurveyAnswer
{
    [Key]
    [Column("survey_answers_id")]
    public int SurveyAnswersId { get; set; }

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

    [Column("survey_question_id")]
    public int SurveyQuestionId { get; set; }

    [Column("survey_question")]
    [StringLength(500)]
    [Unicode(false)]
    public string SurveyQuestion { get; set; } = null!;

    [Column("survey_question_answer")]
    [StringLength(500)]
    [Unicode(false)]
    public string SurveyQuestionAnswer { get; set; } = null!;

    [Column("survey_answer_token")]
    [StringLength(50)]
    [Unicode(false)]
    public string SurveyAnswerToken { get; set; } = null!;

    [Column("created_on", TypeName = "datetime")]
    public DateTime CreatedOn { get; set; }

    [Column("survey_question_token")]
    [StringLength(50)]
    [Unicode(false)]
    public string SurveyQuestionToken { get; set; } = null!;
}
