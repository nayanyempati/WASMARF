using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace opencops_tm_bo.Entities;

[Table("profiles")]
public partial class Profile
{
    [Key]
    [Column("profile_id")]
    public int ProfileId { get; set; }

    [Column("profile_name")]
    [StringLength(200)]
    [Unicode(false)]
    public string ProfileName { get; set; } = null!;

    [Column("profile_description")]
    [StringLength(500)]
    [Unicode(false)]
    public string? ProfileDescription { get; set; }

    [Column("profile_token")]
    [StringLength(50)]
    [Unicode(false)]
    public string ProfileToken { get; set; } = null!;

    [Column("profile_created_on", TypeName = "datetime")]
    public DateTime ProfileCreatedOn { get; set; }

    [Column("profile_created_by")]
    public int ProfileCreatedBy { get; set; }

    [Column("profile_updated_on", TypeName = "datetime")]
    public DateTime ProfileUpdatedOn { get; set; }

    [Column("profile_icon")]
    [Unicode(false)]
    public string? ProfileIcon { get; set; }

    [Required]
    [Column("profile_is_active")]
    public bool? ProfileIsActive { get; set; }

    [Required]
    [Column("profile_readonly")]
    public bool? ProfileReadonly { get; set; }
}
