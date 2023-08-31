using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace opencops_tm_bo.Entities;

[Table("classifications")]
public partial class Classification
{
    [Key]
    [Column("classification_id")]
    public int ClassificationId { get; set; }

    [Column("classification_name")]
    [StringLength(50)]
    [Unicode(false)]
    public string ClassificationName { get; set; } = null!;

    [Column("classification_description")]
    [Unicode(false)]
    public string? ClassificationDescription { get; set; }

    [Column("token")]
    [StringLength(50)]
    [Unicode(false)]
    public string Token { get; set; } = null!;

    [Column("created_on", TypeName = "datetime")]
    public DateTime CreatedOn { get; set; }

    [Column("risk_policy_id")]
    public int? RiskPolicyId { get; set; }

    [Column("risk_policy_name")]
    [StringLength(50)]
    [Unicode(false)]
    public string? RiskPolicyName { get; set; }
}
