<?php
//
//namespace App\Entity;
//
//use Doctrine\Common\Collections\ArrayCollection;
//use Doctrine\Common\Collections\Collection;
//use Doctrine\ORM\Mapping as ORM;
//use Gedmo\Timestampable\Traits\TimestampableEntity;
//use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
//use Symfony\Component\Security\Core\User\UserInterface;
//use Symfony\Component\Validator\Constraints as Assert;
//
///**
// * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
// * @UniqueEntity(fields={"email"}, message="That email is already registered")
// * @UniqueEntity(fields={"profileName"}, message="That username is already registered")
// */
//class User implements UserInterface
//{
//    use TimestampableEntity;
//    /**
//     * @ORM\Id()
//     * @ORM\GeneratedValue()
//     * @ORM\Column(type="integer")
//     */
//    private $id;
//
//    /**
//     * @ORM\Column(type="string", length=180, unique=true)
//     * @Assert\NotBlank(message="Please enter an email address")
//     * @Assert\Email(message="Please enter a valid email address")
//     */
//    private $email;
//
//    /**
//     * @ORM\Column(type="json")
//     */
//    private $roles = [];
//
//    /**
//     * @var string The hashed password
//     * @ORM\Column(type="string")
//     */
//    private $password;
//
//    /**
//     * @ORM\Column(type="string", length=255, nullable=true)
//     * @Assert\Length(
//     *     max="255",
//     *     maxMessage="Max number of characters is 255 characters",
//     *     min="2",
//     *     minMessage="Your first name should be at least 2 characters"
//     * )
//     */
//    private $firstName;
//
//    /**
//     * @ORM\Column(type="string", length=255, nullable=true)
//     * @Assert\Length(
//     *     max="255",
//     *     maxMessage="Max number of characters is 255 characters",
//     *     min="2",
//     *     minMessage="Your last name should be at least 2 characters"
//     * )
//     */
//    private $lastName;
//
//    /**
//     * @ORM\Column(type="string", length=255, nullable=true)
//     * @Assert\Length(
//     *     max="255",
//     *     maxMessage="Max number of characters is 255 characters",
//     *     min="2",
//     *     minMessage="Your username should be at least 2 characters"
//     * )
//     */
//    private $profileName;
//
//    /**
//     * @ORM\Column(type="string", length=255, nullable=true, unique=true)
//     */
//    private $token;
//
//    /**
//     * @ORM\Column(type="datetime", nullable=true)
//     */
//    private $expiresAt;
//
//    /**
//     * @ORM\Column(type="boolean")
//     */
//    private $isVerified = 0;
//
//    /**
//     * @ORM\Column(type="string", length=255, nullable=true)
//     */
//    private $verificationCode;
//
//    /**
//     * @ORM\Column(type="datetime", nullable=true)
//     */
//    private $deletesIn;
//
//    /**
//     * @ORM\OneToMany(targetEntity="App\Entity\Friendship", mappedBy="user")
//     */
//    private $friends;
//
//    /**
//     * @ORM\OneToMany(targetEntity="App\Entity\Friendship", mappedBy="friend")
//     */
//    private $friendsWithMe;
//
//    /**
//     * @ORM\ManyToOne(targetEntity="App\Entity\Test", inversedBy="user")
//     * @ORM\JoinColumn(nullable=false)
//     */
//    private $test;
//
//    /**
//     * @ORM\OneToMany(targetEntity="App\Entity\Test", mappedBy="test2", orphanRemoval=true)
//     */
//    private $tests;
//
//    public function __construct()
//    {
//        $this->friends = new ArrayCollection();
//        $this->friendsWithMe = new ArrayCollection();
//        $this->tests = new ArrayCollection();
//    }
//
//    public function getId(): ?int
//    {
//        return $this->id;
//    }
//
//    public function getEmail(): ?string
//    {
//        return $this->email;
//    }
//
//    public function setEmail(string $email): self
//    {
//        $this->email = $email;
//
//        return $this;
//    }
//
//    /**
//     * A visual identifier that represents this user.
//     *
//     * @see UserInterface
//     */
//    public function getUsername(): string
//    {
//        return (string) $this->email;
//    }
//
//    /**
//     * @see UserInterface
//     */
//    public function getRoles(): array
//    {
//        $roles = $this->roles;
//        // guarantee every user at least has ROLE_USER
//        $roles[] = 'ROLE_USER';
//
//        return array_unique($roles);
//    }
//
//    public function setRoles(array $roles): self
//    {
//        $this->roles = $roles;
//
//        return $this;
//    }
//
//    /**
//     * @see UserInterface
//     */
//    public function getPassword(): string
//    {
//        return (string) $this->password;
//    }
//
//    public function setPassword(string $password): self
//    {
//        $this->password = $password;
//
//        return $this;
//    }
//
//    /**
//     * @see UserInterface
//     */
//    public function getSalt()
//    {
//        // not needed when using the "bcrypt" algorithm in security.yaml
//    }
//
//    /**
//     * @see UserInterface
//     */
//    public function eraseCredentials()
//    {
//        // If you store any temporary, sensitive data on the user, clear it here
//        // $this->plainPassword = null;
//    }
//
//    public function getFirstName(): ?string
//    {
//        return $this->firstName;
//    }
//
//    public function setFirstName(?string $firstName): self
//    {
//        $this->firstName = $firstName;
//
//        return $this;
//    }
//
//    public function getLastName(): ?string
//    {
//        return $this->lastName;
//    }
//
//    public function setLastName(?string $lastName): self
//    {
//        $this->lastName = $lastName;
//
//        return $this;
//    }
//
//    public function getProfileName(): ?string
//    {
//        return $this->profileName;
//    }
//
//    public function setProfileName(?string $profileName): self
//    {
//        $this->profileName = $profileName;
//
//        return $this;
//    }
//
//    public function getToken(): ?string
//    {
//        return $this->token;
//    }
//
//    public function setToken(?string $token): self
//    {
//        $this->token = $token;
//
//        return $this;
//    }
//
//    public function getExpiresAt(): ?\DateTimeInterface
//    {
//        return $this->expiresAt;
//    }
//
//    public function setExpiresAt(?\DateTimeInterface $expiresAt): self
//    {
//        $this->expiresAt = $expiresAt;
//
//        return $this;
//    }
//
//    public function getIsVerified(): ?bool
//    {
//        return $this->isVerified;
//    }
//
//    public function setIsVerified(bool $isVerified): self
//    {
//        $this->isVerified = $isVerified;
//
//        return $this;
//    }
//
//    public function getVerificationCode(): ?string
//    {
//        return $this->verificationCode;
//    }
//
//    public function setVerificationCode(?string $verificationCode): self
//    {
//        $this->verificationCode = $verificationCode;
//
//        return $this;
//    }
//
//    public function getDeletesIn(): ?\DateTimeInterface
//    {
//        return $this->deletesIn;
//    }
//
//    public function setDeletesIn(?\DateTimeInterface $deletesIn = null): self
//    {
//        $this->deletesIn = $deletesIn ? new \DateTime('+ 1 day') : null;
//
//        return $this;
//    }
//
//    /**
//     * @return Collection|Friendship[]
//     */
//    public function getFriends(): Collection
//    {
//        return $this->friends;
//    }
//
//    public function addFriend(Friendship $friend): self
//    {
//        if (!$this->friends->contains($friend)) {
//            $this->friends[] = $friend;
//            $friend->setUser($this);
//        }
//
//        return $this;
//    }
//
//    public function removeFriend(Friendship $friend): self
//    {
//        if ($this->friends->contains($friend)) {
//            $this->friends->removeElement($friend);
//            // set the owning side to null (unless already changed)
//            if ($friend->getUser() === $this) {
//                $friend->setUser(null);
//            }
//        }
//
//        return $this;
//    }
//
//    /**
//     * @return Collection|Friendship[]
//     */
//    public function getFriendsWithMe(): Collection
//    {
//        return $this->friendsWithMe;
//    }
//
//    public function addFriendsWithMe(Friendship $friendsWithMe): self
//    {
//        if (!$this->friendsWithMe->contains($friendsWithMe)) {
//            $this->friendsWithMe[] = $friendsWithMe;
//            $friendsWithMe->setFriend($this);
//        }
//
//        return $this;
//    }
//
//    public function removeFriendsWithMe(Friendship $friendsWithMe): self
//    {
//        if ($this->friendsWithMe->contains($friendsWithMe)) {
//            $this->friendsWithMe->removeElement($friendsWithMe);
//            // set the owning side to null (unless already changed)
//            if ($friendsWithMe->getFriend() === $this) {
//                $friendsWithMe->setFriend(null);
//            }
//        }
//
//        return $this;
//    }
//}
