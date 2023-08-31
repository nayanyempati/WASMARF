using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace opencops_tm_bo.Entities;

[Table("components")]
public partial class Component
{
    [Key]
    [Column("component_id")]
    public int ComponentId { get; set; }

    [Column("component_name")]
    [StringLength(250)]
    [Unicode(false)]
    public string ComponentName { get; set; } = null!;

    [Column("component_description")]
    [Unicode(false)]
    public string? ComponentDescription { get; set; }

    [Required]
    [Column("component_status")]
    public bool? ComponentStatus { get; set; }

    [Column("component_type")]
    [StringLength(50)]
    [Unicode(false)]
    public string ComponentType { get; set; } = null!;

    [Column("component_token")]
    [StringLength(50)]
    [Unicode(false)]
    public string ComponentToken { get; set; } = null!;

    [Column("created_on", TypeName = "datetime")]
    public DateTime CreatedOn { get; set; }

    [Column("modified_on", TypeName = "datetime")]
    public DateTime ModifiedOn { get; set; }
}
