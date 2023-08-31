using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace opencops_tm_bo.Entities;

[Table("answer_weakness_mapping")]
public partial class AnswerWeaknessMapping
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("answer_id")]
    public int AnswerId { get; set; }

    [Column("weakness_id")]
    public int WeaknessId { get; set; }

    [Column("token")]
    [StringLength(50)]
    [Unicode(false)]
    public string Token { get; set; } = null!;

    [Column("created_on", TypeName = "datetime")]
    public DateTime CreatedOn { get; set; }
}
