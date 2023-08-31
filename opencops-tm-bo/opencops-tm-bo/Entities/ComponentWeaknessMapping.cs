using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace opencops_tm_bo.Entities;

[Table("component_weakness_mapping")]
public partial class ComponentWeaknessMapping
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("component_id")]
    public int ComponentId { get; set; }

    [Column("weakness_id")]
    public int WeaknessId { get; set; }

    [Column("created_on", TypeName = "datetime")]
    public DateTime CreatedOn { get; set; }

    [Column("token")]
    [StringLength(50)]
    [Unicode(false)]
    public string Token { get; set; } = null!;
}
