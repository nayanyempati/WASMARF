using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace opencops_tm_bo.Entities;

[Table("weakness")]
public partial class Weakness
{
    [Key]
    [Column("weakness_id")]
    public int WeaknessId { get; set; }

    [Column("weakness_name")]
    [StringLength(500)]
    [Unicode(false)]
    public string WeaknessName { get; set; } = null!;

    [Column("weakness_description")]
    [Unicode(false)]
    public string? WeaknessDescription { get; set; }

    [Column("weakness_risk_rating")]
    public int WeaknessRiskRating { get; set; }

    [Column("weakness_cwes")]
    [StringLength(100)]
    [Unicode(false)]
    public string? WeaknessCwes { get; set; }

    [Column("weakness_category")]
    [StringLength(250)]
    [Unicode(false)]
    public string? WeaknessCategory { get; set; }

    [Column("created_on", TypeName = "datetime")]
    public DateTime CreatedOn { get; set; }

    [Column("custom")]
    public bool Custom { get; set; }

    [Column("weakness_token")]
    [StringLength(50)]
    [Unicode(false)]
    public string WeaknessToken { get; set; } = null!;
}
