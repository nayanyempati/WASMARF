using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace opencops_tm_bo.Entities;

[Table("how_to")]
public partial class HowTo
{
    [Key]
    [Column("how_to_id")]
    public int HowToId { get; set; }

    [Column("how_to_name")]
    [StringLength(500)]
    [Unicode(false)]
    public string HowToName { get; set; } = null!;

    [Column("how_to_description")]
    [Unicode(false)]
    public string? HowToDescription { get; set; }

    [Column("how_to_token")]
    [StringLength(50)]
    [Unicode(false)]
    public string HowToToken { get; set; } = null!;

    [Column("countermeasure_token")]
    [StringLength(50)]
    [Unicode(false)]
    public string CountermeasureToken { get; set; } = null!;

    [Column("custom")]
    public bool Custom { get; set; }

    [Column("created_on", TypeName = "datetime")]
    public DateTime CreatedOn { get; set; }
}
