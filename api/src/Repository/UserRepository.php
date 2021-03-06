<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\AbstractQuery;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

   /**
    * @return User[] Returns an array of User objects
    */
    public function findUsersToDelete()
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.isVerified = 0')
            ->andWhere("u.deletesIn < :now")
            ->setParameter('now', new \DateTime(), \Doctrine\DBAL\Types\Type::DATETIME)
            ->getQuery()
            ->getResult()
        ;
    }


    /**
     * @return User[] Returns an array of User objects
     */
    public function findExpiredTokens()
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.expiresAt < :now')
            ->setParameter('now', new \DateTime(), \Doctrine\DBAL\Types\Type::DATETIME)
            ->getQuery()
            ->getResult();
    }

    public function findByQuery(string $q, User $user)
    {

        return $this->createQueryBuilder('u')
            ->select('u.id,u.profileName,u.firstName,u.lastName,u.profilePicture')
            ->orWhere('u.firstName LIKE :q')
            ->orWhere('u.lastName LIKE :q')
            ->orWhere('u.profileName LIKE :q')
            ->andWhere('u.id != :userId')
            ->andWhere('u.isVerified = true')
            ->setParameter('q','%'.$q.'%')
            ->setParameter('userId', $user->getId())
            ->orderBy('u.firstName','ASC')
            ->orderBy('u.lastName','ASC')
            ->getQuery()
            ->getArrayResult();
    }


    public function findIfFriendWithMe($me,$userId)
    {
        return $this->createQueryBuilder('u')
            ->select('u.id,u.profileName,u.firstName,u.lastName')
            ->orWhere('u.firstName LIKE :q')
            ->orWhere('u.lastName LIKE :q')
            ->orWhere('u.profileName LIKE :q')
            ->andWhere('u.id != :userId')
            ->andWhere('u.isVerified = true')
            ->setParameter('q','%'.$q.'%')
            ->setParameter('userId', $user->getId())
            ->orderBy('u.firstName','ASC')
            ->orderBy('u.lastName','ASC')
            ->getQuery()
            ->getResult(AbstractQuery::HYDRATE_OBJECT);
    }
    /*
    public function findOneBySomeField($value): ?User
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
