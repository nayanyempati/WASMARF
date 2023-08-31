using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace opencops_tm_bo.Entities;

[Table("countermeasures")]
public partial class Countermeasure
{
    [Key]
    [Column("countermeasure_id")]
    public int CountermeasureId { get; set; }

    [Column("countermeasure_name")]
    [StringLength(250)]
    [Unicode(false)]
    public string CountermeasureName { get; set; } = null!;

    [Column("countermeasure_solution")]
    [Unicode(false)]
    public string? CountermeasureSolution { get; set; }

    [Column("countermeasure_priority")]
    public int? CountermeasurePriority { get; set; }

    [Column("countermeasure_token")]
    [StringLength(50)]
    [Unicode(false)]
    public string CountermeasureToken { get; set; } = null!;

    [Column("created_on", TypeName = "datetime")]
    public DateTime CreatedOn { get; set; }

    [Column("custom")]
    public bool Custom { get; set; }

    [Column("weakness_token")]
    [StringLength(50)]
    [Unicode(false)]
    public string WeaknessToken { get; set; } = null!;

    [Column("weakness_id")]
    public int WeaknessId { get; set; }

    [Column("phase")]
    [StringLength(200)]
    [Unicode(false)]
    public string? Phase { get; set; }
}
