using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace opencops_tm_bo.Entities;

[Table("users")]
public partial class User
{
    [Key]
    [Column("user_id")]
    public int UserId { get; set; }

    [Column("first_name")]
    [StringLength(50)]
    [Unicode(false)]
    public string FirstName { get; set; } = null!;

    [Column("last_name")]
    [StringLength(50)]
    [Unicode(false)]
    public string LastName { get; set; } = null!;

    [Column("email")]
    [StringLength(50)]
    [Unicode(false)]
    public string Email { get; set; } = null!;

    [Column("pass_hash")]
    [Unicode(false)]
    public string PassHash { get; set; } = null!;

    [Column("activation_key")]
    [Unicode(false)]
    public string ActivationKey { get; set; } = null!;

    [Column("reset_key")]
    [Unicode(false)]
    public string ResetKey { get; set; } = null!;

    [Column("created_on", TypeName = "datetime")]
    public DateTime CreatedOn { get; set; }

    [Column("updated_on", TypeName = "datetime")]
    public DateTime UpdatedOn { get; set; }

    [Column("company_name")]
    [StringLength(50)]
    [Unicode(false)]
    public string CompanyName { get; set; } = null!;

    [Column("account_activated")]
    public bool AccountActivated { get; set; }

    [Column("reset_key_valid_till", TypeName = "datetime")]
    public DateTime ResetKeyValidTill { get; set; }

    [Column("avatar")]
    [Unicode(false)]
    public string? Avatar { get; set; }
}
