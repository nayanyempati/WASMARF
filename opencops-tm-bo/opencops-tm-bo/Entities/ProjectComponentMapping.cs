using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace opencops_tm_bo.Entities;

[Table("project_component_mapping")]
public partial class ProjectComponentMapping
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("project_id")]
    public int ProjectId { get; set; }

    [Column("project_token")]
    [StringLength(50)]
    [Unicode(false)]
    public string ProjectToken { get; set; } = null!;

    [Column("component_id")]
    public int ComponentId { get; set; }

    [Column("componenet_token")]
    [StringLength(50)]
    [Unicode(false)]
    public string ComponenetToken { get; set; } = null!;

    [Column("created_on", TypeName = "datetime")]
    public DateTime CreatedOn { get; set; }

    [Column("token")]
    [StringLength(50)]
    [Unicode(false)]
    public string Token { get; set; } = null!;
}
