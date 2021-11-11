package com.swh.bookstore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;

@Data
@Entity
@Table(name = "user_info")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer", "fieldHandler"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "userId")
public class UserInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userInfoId;

    private Integer userId;
    private String nickname;
    private String name;
    private String email;
    private String tel;
    private String address;

//    @Basic(fetch = FetchType.LAZY)
//    @LazyCollection(LazyCollectionOption.TRUE)
//    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
//    private String avatar;
}
