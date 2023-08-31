using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace opencops_tm_bo.Entities;

public partial class dbCon : DbContext
{
    public dbCon()
    {
    }

    public dbCon(DbContextOptions<dbCon> options)
        : base(options)
    {
    }

    public virtual DbSet<AnswerWeaknessMapping> AnswerWeaknessMappings { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Classification> Classifications { get; set; }

    public virtual DbSet<Component> Components { get; set; }

    public virtual DbSet<ComponentWeaknessMapping> ComponentWeaknessMappings { get; set; }

    public virtual DbSet<Countermeasure> Countermeasures { get; set; }

    public virtual DbSet<HowTo> HowTos { get; set; }

    public virtual DbSet<Phase> Phases { get; set; }

    public virtual DbSet<Profile> Profiles { get; set; }

    public virtual DbSet<ProfileWeaknessMapping> ProfileWeaknessMappings { get; set; }

    public virtual DbSet<Project> Projects { get; set; }

    public virtual DbSet<ProjectComponentMapping> ProjectComponentMappings { get; set; }

    public virtual DbSet<RiskPolicy> RiskPolicies { get; set; }

    public virtual DbSet<SurveyAnswer> SurveyAnswers { get; set; }

    public virtual DbSet<SurveyQuestion> SurveyQuestions { get; set; }

    public virtual DbSet<SurveySection> SurveySections { get; set; }

    public virtual DbSet<SurveySubsection> SurveySubsections { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Weakness> Weaknesses { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("data source=localhost; initial catalog=opencops-tm-db; Integrated Security=True;  TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Component>(entity =>
        {
            entity.Property(e => e.ComponentStatus).HasDefaultValueSql("((1))");
        });

        modelBuilder.Entity<Profile>(entity =>
        {
            entity.Property(e => e.ProfileCreatedOn).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.ProfileIsActive).HasDefaultValueSql("((1))");
            entity.Property(e => e.ProfileReadonly).HasDefaultValueSql("((1))");
            entity.Property(e => e.ProfileUpdatedOn).HasDefaultValueSql("(getdate())");
        });

        modelBuilder.Entity<SurveySection>(entity =>
        {
            entity.Property(e => e.Custom).HasDefaultValueSql("((0))");
        });

        modelBuilder.Entity<SurveySubsection>(entity =>
        {
            entity.Property(e => e.Custom).HasDefaultValueSql("((0))");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.CreatedOn).HasDefaultValueSql("(getdate())");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
