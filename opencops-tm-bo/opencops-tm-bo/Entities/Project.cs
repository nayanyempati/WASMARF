using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace opencops_tm_bo.Entities;

[Table("projects")]
public partial class Project
{
    [Key]
    [Column("project_id")]
    public int ProjectId { get; set; }

    [Column("project_name")]
    [StringLength(250)]
    [Unicode(false)]
    public string ProjectName { get; set; } = null!;

    [Column("projct_description")]
    [Unicode(false)]
    public string? ProjctDescription { get; set; }

    [Column("project_tags")]
    [Unicode(false)]
    public string? ProjectTags { get; set; }

    [Column("risk_policy_id")]
    public int RiskPolicyId { get; set; }

    [Column("risk_policy_name")]
    [StringLength(50)]
    [Unicode(false)]
    public string RiskPolicyName { get; set; } = null!;

    [Column("token")]
    [StringLength(50)]
    [Unicode(false)]
    public string Token { get; set; } = null!;

    [Column("created_on", TypeName = "datetime")]
    public DateTime CreatedOn { get; set; }

    [Column("survey_completed")]
    public bool SurveyCompleted { get; set; }

    [Column("profile_id")]
    public int? ProfileId { get; set; }
}
