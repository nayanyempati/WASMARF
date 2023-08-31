using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace opencops_tm_bo.Entities;

[Table("risk_policies")]
public partial class RiskPolicy
{
    [Key]
    [Column("risk_policy_id")]
    public int RiskPolicyId { get; set; }

    [Column("risk_policy_name")]
    [StringLength(500)]
    [Unicode(false)]
    public string RiskPolicyName { get; set; } = null!;

    [Column("risk_policy_description")]
    [Unicode(false)]
    public string RiskPolicyDescription { get; set; } = null!;

    [Column("risk_policy_inclusion")]
    [Unicode(false)]
    public string? RiskPolicyInclusion { get; set; }

    [Column("risk_policy_countermeasure_priority")]
    public int? RiskPolicyCountermeasurePriority { get; set; }

    [Column("risk_policy_countermeasure_priority_name")]
    [StringLength(50)]
    [Unicode(false)]
    public string? RiskPolicyCountermeasurePriorityName { get; set; }

    [Column("token")]
    [StringLength(50)]
    [Unicode(false)]
    public string Token { get; set; } = null!;

    [Column("created_on", TypeName = "datetime")]
    public DateTime CreatedOn { get; set; }

    [Column("custom")]
    public bool Custom { get; set; }
}
