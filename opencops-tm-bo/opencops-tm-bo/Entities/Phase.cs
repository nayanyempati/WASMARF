using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace opencops_tm_bo.Entities;

[Table("phases")]
public partial class Phase
{
    [Key]
    [Column("phase_id")]
    public int PhaseId { get; set; }

    [Column("phase_name")]
    [StringLength(200)]
    [Unicode(false)]
    public string PhaseName { get; set; } = null!;

    [Column("phase_description")]
    [Unicode(false)]
    public string? PhaseDescription { get; set; }

    [Column("custom")]
    public bool Custom { get; set; }

    [Column("created_on", TypeName = "datetime")]
    public DateTime CreatedOn { get; set; }

    [Column("token")]
    [StringLength(50)]
    [Unicode(false)]
    public string Token { get; set; } = null!;
}
