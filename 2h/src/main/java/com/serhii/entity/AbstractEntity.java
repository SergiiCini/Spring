package com.serhii.entity;

import javax.persistence.*;

@MappedSuperclass
public abstract class AbstractEntity {
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Long id;

      public AbstractEntity() {
      }

      public Long getId() {
            return id;
      }
}
